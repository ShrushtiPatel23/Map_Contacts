import logo from './logo.svg';
import './App.css';
import './Contact.css';
import Contact from './components/Contact';
import "leaflet/dist/leaflet.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Charts from './components/Charts';

function App() {
  return (
    
    <BrowserRouter>
    
    <div className='App'>
    <Sidebar />
    <Routes>
          <Route path='/' element= {<Contact />} />
          
          <Route path='/chart' element= {<Charts />} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
