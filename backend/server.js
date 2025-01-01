// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/emailApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Email Schema and Model
const emailSchema = new mongoose.Schema({
  to: String,
  subject: String,
  body: String,
  attachments: Array,
  updatedAt: { type: Date, default: Date.now },
});

const Email = mongoose.model('Email', emailSchema);

// Route to Save or Update Draft
app.post('/save-email', async (req, res) => {
  const { _id, to, subject, body, attachments } = req.body;

  try {
    // If _id is provided, try to update; otherwise, create a new document
    let email;
    if (_id && mongoose.Types.ObjectId.isValid(_id)) {
      email = await Email.findOneAndUpdate(
        { _id },
        { to, subject, body, attachments, updatedAt: Date.now() },
        { new: true, upsert: true }
      );
    } else {
      email = new Email({ to, subject, body, attachments });
      await email.save();
    }
    res.status(200).json(email);
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to Get All Drafts
app.get('/drafts', async (req, res) => {
  try {
    const drafts = await Email.find().sort({ updatedAt: -1 }); // Latest first
    res.status(200).json(drafts);
  } catch (error) {
    console.error('Error fetching drafts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to Get a Single Draft by ID
app.get('/drafts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid draft ID' });
    }
    const draft = await Email.findById(id);
    if (!draft) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    res.status(200).json(draft);
  } catch (error) {
    console.error('Error fetching draft:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to Delete a Draft by ID (Optional)
app.delete('/drafts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid draft ID' });
    }
    const deletedDraft = await Email.findByIdAndDelete(id);
    if (!deletedDraft) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    res.status(200).json({ message: 'Draft deleted successfully' });
  } catch (error) {
    console.error('Error deleting draft:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
