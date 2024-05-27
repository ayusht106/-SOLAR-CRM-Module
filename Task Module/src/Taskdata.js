import React, { useState, useEffect } from 'react';
import './table.css';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
const Taskdata = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [isCollapsed, setIsCollapsed] =useState(false);
  const tasksPerPage = 10; 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks/');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(tasks.length / tasksPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className='Mmain'>
      <div className="Rigt-button">
       
        <button className='butto'>
          <Link to="/create">Create Task</Link>
        </button>
      </div>
  
      <div className="pagination">
      <h4> Total Records: {tasks.length}</h4>
        <button onClick={() => paginate(currentPage - 1)} className='zz'>←</button>
        <span>{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} className='zzz'>→</button>
      </div>
      <div><Sidebar /></div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Owner</th>
              <th>Due Date</th>
              <th>Contact</th>
              <th>Account</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task._id}>
                <td>
                <div className="hover-row">
                  <Link to={`/api/tasks/${task._id}`}>{task.owner}</Link>
                  </div>
                  </td>
                <td>{task.dueDate}</td>
                <td>{task.contact}</td>
                <td>{task.account}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Taskdata;