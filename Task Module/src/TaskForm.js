import React, { useState } from 'react';
import './Form.css';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    owner: '',
    subject: '',
    dueDate: '',
    contact: '',
    account: '',
    status: '',
    priority: '',
  });

  const initialtaskdata ={
    owner: '',
    subject: '',
    dueDate: '',
    contact: '',
    account: '',
    status: '',
    priority: ''
  };

  // const [contactType, setContactType] = useState('Contact');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const handleContactTypeChange = (e) => {
  //   setContactType(e.target.value);
  // };

  const handleSubmit = async () => {

    if (
      formData.owner.trim() === '' ||
      formData.subject.trim() === '' ||
      formData.dueDate.trim() === '' ||
      formData.contact.trim() === '' ||
      formData.account.trim() === '' ||
      formData.status.trim() === ''
    ) {
      alert('Please fill in all required fields');
      return;
    }


    try {
    const response = await fetch('http://localhost:3000/api/tasks/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if(response.ok){
        alert('Task created successfully');
    } else {
        alert('Failed to create task');
    }
  } catch(error){
    console.error('error', error);
    alert('Error', error);
  }


};


const handelCancel =()=>{
  setFormData({...initialtaskdata});
}

  return (
    <div classname="main">
      <div className='head'>
      <h2>Create Task</h2>
      <div className="right-button">
          <button className='buttons' onClick={handelCancel}>Cancel</button>
          <button className='buttons'>Save and New</button>
          <button className='button' onClick={handleSubmit}>Save</button>
        </div>
      </div>
      <hr />
     
      <div className="M">
      <div className="form-row">
        <label> Task Owner
          <input type="text" name="owner" className='a' value={formData.owner} onChange={handleChange} /> 
        </label> 
        <div className="custom-line"></div>
        </div>
        <div className="form-row">
        <div class="sub">
        <label>
          Subject
          <input type="text" name="subject" className='b' value={formData.subject} onChange={handleChange} />
        </label>
        <div className="custom-line"></div>
        </div>
      </div>
      <div className="form-row">
      <div class="date">
        <label>
          Due Date
          <input type="date" name="dueDate" className='c' value={formData.dueDate} onChange={handleChange} />
        </label>
        <div className="custom-line"></div>
        </div>
      </div>
      <div className="form-row">
      <div class="text">
        <label>
        <box-icon name='search'>
          Contact
          <input type="text" name="contact" className='d'value={formData.contact} onChange={handleChange} />
          </box-icon>
        </label>
        <div className="custom-line"></div>
        </div>
      </div>
      <div className="form-row">
      <div class="acc">
        <label>
          Account
          <input type="text" name="account" className='e' value={formData.account} onChange={handleChange} />
        </label>
        <div className="custom-line"></div>
        </div>
      </div>
      <div className="form-row">
      <div class="status">
        <label>
          Status
          <select name="status" className='f'value={formData.status} onChange={handleChange}>
          <option>Not Started</option>
            <option>Deffered</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Waiting for Input</option>
          </select>
        </label>
        <div className="custom-line"></div>
        </div>
      </div>

      <div className="form-row">
      <div class="priority">
        <label>
          Priority
          <select name="priority" className='g'value={formData.priority} onChange={handleChange}>
          <option>High</option>
            <option>Highest</option>
            <option>Low</option>
            <option>Lowest</option>
            <option>Normal</option>
          </select>
        </label>
        <div className="custom-line"></div>
        </div>
      </div>

      </div>
    </div>
  );
};

export default TaskForm;