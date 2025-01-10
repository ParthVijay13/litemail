import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Login from "./login"
import Signup from "./signup"
import Inbox from './inbox';
import Starred from '../components/starred';
import DraftsSection from './DraftsSection';
import EmailDetail from './EmailDetail';
import Footer from './Footer';
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/inbox" element = {<Inbox/>}/>
      <Route path="/inbox/:id" element={<EmailDetail />} />
      <Route path="/starred" element= {<Starred/>}/>
      <Route path="/starred/:id" element={<EmailDetail />} />
      <Route path="/draft" element={<DraftsSection/>}>
      </Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App;

