import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import "../Css/Timeline.css";
import { PiPencilLineThin } from "react-icons/pi";
import Navbar from './Navbar';
import Navbarbottom from './NavbarBottom';


function LeadDetails(props) {
    const { id } = useParams();
    const [lead, setLead] = useState([]);
    const [changes, setChanges] = useState([]);

    console.log(id);
    useEffect(() => {
        const fetchLead = async () => {
            try {
                const response = await fetch(`http://localhost:3020/api/details/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    // console.log(data);
                    setLead(data);
                    setChanges(data.changes);
                } else {
                    console.error('Failed to fetch lead data');
                }
            } catch (error) {
                console.error('Error fetching lead:', error);
            }
        };

        fetchLead();
    }, [props.id]);
    console.log(lead);

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const formattedTime = date.toLocaleTimeString();
        return formattedTime;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
    };


    return (
        <div className='timeline'>

        <Navbar />
        <div className='pa'>
          <div className='same'>
        <p>Overview</p>
        </div>
      <div className="riit-button">
          <button className='buttonss'>
          <Link to='/table' className='crm'>Cancel</Link></button>
          <button className='buttonss'>
          <Link to={`/update/${id}`} className='crm'>Overview</Link></button>
          
        </div>
        </div>
            <div className='t-box'>
            <p>History</p>

            <ul>
                {changes.map(change => (
                    <li key={change.field} className='list-item'>
                        <div className='pa-box'>
                        <p className='paragraph'>{formatDate(change.updatedAt)}</p>
                        <p className='paragraph'>{formatTime(change.updatedAt)}</p>
                        </div>

                        <div className='history'>
                        <div className='a-box'>
                        {/* <div className="vertical-line"></div> */}
            <div className='arrow'>
            <PiPencilLineThin />
            </div>
            <div className="vertical-line"></div>
            </div>
            <div className='conte'>{change.field} was updated from {change.oldValue} to {change.newValue} on {formatDate(change.updatedAt)} at {formatTime(change.updatedAt)}<br /></div>
            {/* <div className='conte'>Old Value: {change.oldValue}<br /></div>
            <div className='conte'>New Value: {change.newValue}<br /></div> */}

                        </div>
                        {/* <div className='ua'>{formatTime(change.updatedAt)}<br /></div> */}


                    </li>
                ))}
            </ul>
            </div>

            <Navbarbottom />
        </div>
    );
}

export default LeadDetails;


