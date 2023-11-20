
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import User from './components/User/User';
import Navbarr from './components/Navbar/Navbarr';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbarr/>
      <Routes>
        <Route  path='/'  element={<Home/>} />
        <Route  path='/users/:userId'  element={<User/>} />
      </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;
