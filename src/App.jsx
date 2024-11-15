import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Login from "./login"
import Signup from "./signup"
import Inbox from './inbox';
import Starred from '../components/starred';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/inbox" element = {<Inbox/>}/>
      <Route path="/starred" element= {<Starred/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;

