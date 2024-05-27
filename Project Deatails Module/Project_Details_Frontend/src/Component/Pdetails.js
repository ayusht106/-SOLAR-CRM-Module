import React,{ useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/details.css';
import Navbar from './Navbar';
import NavbarBottom from './NavbarBottom';

const Pdetails = () => {
const[userEmail,setUserEmail]= useState('');

useEffect(() => {
  const email = sessionStorage.getItem('userEmail');
  if(email){
    setUserEmail(email);
  }
}, []);

  const [Data, setData] = useState({
    finance: '',
    project: '',
    tentative: '',
    companyS: '',
    companyc: '',
  });

  const initialPdetails ={
    finance: '',
    project: '',
    tentative: '',
    companyS: '',
    companyc: ''
  };

const [statesList, setStatesList] = useState([]);
const [citiesList, setCitiesList] = useState([]);
const navigate = useNavigate();
  
useEffect(() => {
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

  fetchStates();
}, []);

  
    const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

const handleSubmit = async () => {
  // if (
  //         Data.finance.trim() === '' ||
  //         Data.project.trim() === '' ||
  //         Data.tentative.trim() === '' ||
  //         Data.companyS.trim() === '' ||
  //         Data.companyc.trim() === ''
  //       ) {
  //         alert('Please fill in all required fields');
  //         return;
  //       }
    
    
        try {
        const response = await fetch('http://localhost:3020/api/details/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...Data, userEmail: userEmail}),
        });
    
        if(response.ok){
            alert('Details saved successfully');
            setData(initialPdetails);           }  
        else {
            alert('Failed to create task');
        }
      } catch(error){
        console.error('error', error);
        alert('Error', error);
      }
    
    
    };


    const handleSaveAndNext = () => {
      handleSubmit();
  
        if (Data.finance === 'OPEX') {
          navigate('/opex');
        } else {
          navigate('/default-next-page');
        }
    };
  
    const handelCancel = () => {
      setData({ ...initialPdetails });
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

    <div classname="main">
      <div className='head'>
      <Navbar/> 
      <p>Project Details</p>
      <div className="right-button">
          <button className='buttons' onClick={handelCancel}>Cancel</button>
          <button className='buttons' onClick={handleSaveAndNext}>Save and Next</button>
          <button className='button' onClick={handleSubmit}>Save</button>
        </div>
      </div>
      <hr />
     
      <div className="M">
        <form>
      <div className="form-row">
        <label> FINANCE STRUCTURE
        <select name="finance" className='a'value={Data.finance} onChange={handleChange}>
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
          <select name="project" className='b' value={Data.project} onChange={handleChange}>
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
          <input type="text" name="tentative" className='c' value={Data.tentative} onChange={handleChange} placeholder='In KW(AC)'/>
        </label>
        
        </div>
      </div>
      <div className="form-row">
      <div class="text">
        <label>
        COMPANY STATE
        <select name="companyS" className="d" value={Data.companyS} onChange={(e) => { handleChange(e); handleStateChange(e); }}>
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
              <select name="companyc" className="e" value={Data.companyc} onChange={handleChange}>
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
        </form>
      </div>
      <NavbarBottom/>
      </div>
  );
};

export default Pdetails;
