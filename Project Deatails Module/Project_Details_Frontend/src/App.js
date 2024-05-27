import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Pdetails from './Component/Pdetails';
import './App.css';
import DataTable from './Component/DataTable';
// import Navbar from './Component/Navbar';
// import NavbarBottom from './Component/NavbarBottom';
import User from './Component/User';
import Login from './Component/Login';
import Timeline from './Component/Timeline';

function App() {
  return (
<div className="App">
{/* <Navbar/>  */}
 <Routes>
  <Route path='/' element={<Login/>}></Route>
  <Route path='/table' element={<DataTable/>}></Route>
   <Route path='/create' element={<Pdetails/>}></Route>
  <Route path='/update/:id' element={<User />}></Route>
  <Route path='/timeline/:id' element={<Timeline/>}></Route>
 </Routes>
 {/* <NavbarBottom/> */}
    </div>
  );
}

export default App;
