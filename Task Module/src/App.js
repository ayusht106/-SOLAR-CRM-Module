// import logo from './logo.svg';
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import './App.css';
import Taskdata from './Taskdata.js'
import TaskForm from './TaskForm.js';
import User from './User.js';
function App() {
  return (
    <div>
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Taskdata />}></Route>
  <Route path='/create' element={<TaskForm />}></Route>
  <Route path='/api/tasks/:id' element={<User />}></Route>
 </Routes>
 </BrowserRouter>
   </div>
  );
}

export default App;
