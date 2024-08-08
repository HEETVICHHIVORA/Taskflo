
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Homepage } from './pages/Homepage';
import { Addbytext } from './components/Addbytext';
import { Addbysound } from './components/Addbysound';
function App() {
  return (
    <>
       <BrowserRouter>
      <Routes>
      <Route path='/home' element ={<Homepage/>}></Route>
      <Route path='/create' element ={<Addbytext/>}></Route>
      <Route path='/createvoice' element ={<Addbysound/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;