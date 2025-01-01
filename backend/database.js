import mongoose from 'mongoose';

const { Schema } = mongoose;

const composeEmailSchema = new Schema(
  {
    to: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    subject: {
      type: String,
      default: '', // Subject is optional
    },
    body: {
      type: String,
      default: '', // Body is optional
    },
    attachments: [
      {
        name: {
          type: String,
          required: true,
        },
        path: {
          type: String,
          required: true,
        },
        size: {
          type: Number,
          required: true, // File size in bytes
        },
      },
    ],
    isDraft: {
      type: Boolean,
      default: true, // Indicates whether it's a draft or sent email
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Model creation
const ComposeEmail = mongoose.model('ComposeEmail', composeEmailSchema);

export default ComposeEmail;
