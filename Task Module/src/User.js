import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './user.css';

const User = () => {
  const [tasks, setTasks] = useState([]);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/tasks/${id}`);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorMessage}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`,{
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(tasks),
      });
  
      if(response.ok){
          alert('Task Updated successfully');
      } else {
          alert('Failed to create task');
      }
    } catch(error){
      console.error('error', error);
      alert('Error', error);
    }
  
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTasks((prevData) => ({ ...prevData, [name]: value }));
  };


  return (
    <div className='abcd'>
      <div className="rit-button">
          <button className='button' onClick={handleSubmit}>Save</button>
        </div>

        <form>
          <div className='fields'>
        <div className="fm-row">
        <label> Task Owner
          <input type="text" name="owner" className='aa' value={tasks.owner} onChange={handleChange} /> 
        </label> 
        </div>
        <div className="fm-row">
        <label> Contact
          <input type="text" name="contact" className='ab' value={tasks.contact} onChange={handleChange} /> 
        </label> 
        </div>
        <div className="fm-row">
        <label> Due Date
          <input type="text" name="Due Date" className='ac' value={tasks.dueDate} onChange={handleChange} /> 
        </label> 
        </div>
        <div className="fm-row">
        <label> Account
          <input type="text" name="Account" className='ad' value={tasks.account} onChange={handleChange} /> 
        </label> 
        </div>
        <div className="fmm-row">
        <label>
          Status
          <select name="status" className='ae' value={tasks.status} onChange={handleChange}>
          <option>Not Started</option>
            <option>Deffered</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Waiting for Input</option>
          </select>
        </label>
        </div>
        <div className="fmmm-row">
        <label>
          Priority
          <select name="Priority" className='af'value={tasks.priority} onChange={handleChange}>
          <option>High</option>
            <option>Highest</option>
            <option>Low</option>
            <option>Lowest</option>
            <option>Normal</option>
          </select>
        </label>
        </div>
        </div>
        </form>
    </div>
  );
};

export default User;