import React, { useState, useEffect } from 'react';
import { useParams,Link} from 'react-router-dom';
import Navbar from './Navbar';
import NavbarBottom from './NavbarBottom';
import '../Css/user.css';

const User = () => {
  const [details, setdetails] = useState([]);
  const { id } = useParams();
  console.log(id);

const [statesList, setStatesList] = useState([]);
const [citiesList, setCitiesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3020/api/details/${id}`);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorMessage}`);
        }
        const data = await response.json();
        setdetails(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    const fetchStates = async () => {
        try {
          const response = await fetch('http://localhost:3020/api/details/c/c/states');
          if (response.ok) {
            const data = await response.json();
            setStatesList(data.states);
          } else {
            console.error('Failed to fetch states');
          }
        } catch (error) {
          console.error('Error fetching states:', error);
        }
      };

    fetchData();
    fetchStates();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3020/api/details/${id}`,{
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(details),
      });
  
      if(response.ok){
          alert('Details Updated successfully');
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
    setdetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleStateChange = async (e) => {
    const selectedState = e.target.value;
    const response = await fetch(`http://localhost:3020/api/details/cities/${selectedState}`);
    if (response.ok) {
      const data = await response.json();
      setCitiesList(data.cities);
    } else {
      console.error('Failed to fetch cities');
    }
  };


  return (
    <div className='abcd'>
      <Navbar/>
        <div className='pa'>
          <div className='same'>
        <p>Overview</p>
        </div>
      <div className="riit-button">
          <button className='buttonss'>
          <Link to='/table' className='crm'>Cancel</Link></button>
          <button className='buttonss'>
          <Link to={`/timeline/${id}`} className='crm'>Timeline</Link></button>
          <button className='buutton' onClick={handleSubmit}>Update</button>
        </div>
        </div>
        <hr />

        <form>
          <div className='fields'>
        <div className="form-row">
        <label> FINANCE STRUCTURE
        <select name="finance" className='a'value={details.finance} onChange={handleChange}>
        <option value="">Select a Finance Structre</option>
          <option>CAPEX</option>
            <option>OPEX</option>
          </select>
        </label> 
        </div>
        <div className="form-row">
        <div class="PROJECT TYPE">
        <label>
          PROJECT TYPE
          <select name="project" className='b' value={details.project} onChange={handleChange}>
          <option value="">Select a Subject</option>
          <option>Roof Top</option>
            <option>Ground Mounted</option>
            <option>Open Access</option>
          </select>
        </label>
        </div>
      </div>
      <div className="form-row">
      <div class="TENTATIVE CAPACITY">
        <label>
        TENTATIVE CAPACITY
          <input type="text" name="tentative" className='c' value={details.tentative} onChange={handleChange} placeholder='In KW(AC)'/>
        </label>
        </div>
      </div>
      <div className="form-row">
      <div class="text">
        <label>
        COMPANY STATE
        <select name="companyS" className="d" value={details.companyS} onChange={(e) => { handleChange(e); handleStateChange(e); }}>
        <option value="">Select a state</option>
        {statesList.map((state, index) => (
        <option key={index} value={state}>
        {state}
      </option>
      ))}
      </select>
    </label>
    </div>
    </div>
        
    <div className="form-row">
          <div className="acc">
            <label>
              COMPANY CITY
              <select name="companyc" className="e" value={details.companyc} onChange={handleChange}>
                <option value="">Select a city</option>
                {citiesList.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        </div>
        </form>
        <NavbarBottom/>
    </div>
  );
};

export default User;