import React, { useState } from 'react';
import '../Css/styles.css';
import { Link } from 'react-router-dom';
import { CiFilter } from "react-icons/ci";
import { FaListUl } from "react-icons/fa6";

function Navbarmiddle({ onCreateContact }) {
    const [allContactsDropdownVisible, setAllContactsDropdownVisible] = useState(false);
    const [actionsDropdownVisible, setActionsDropdownVisible] = useState(false);
    const [viewDropdownVisible, setViewDropdownVisible] = useState(false);

    const toggleAllContactsDropdown = () => {
        setAllContactsDropdownVisible(!allContactsDropdownVisible);
    };

    const toggleActionsDropdown = () => {
        setActionsDropdownVisible(!actionsDropdownVisible);
    };

    const toggleViewDropdown = () => {
        setViewDropdownVisible(!viewDropdownVisible);
    };

    return (
        <div className="navbar2">
            {/* Filter button */}
            <button style={{ backgroundColor: 'white', color: 'black', border: '1px solid #c8cdd2', marginRight: '-615px', borderWidth: '1.5px', fontSize: '20px' }} className='Alldropdown-btn'>
                {/* <i className="fas fa-filter"></i> */}
                <CiFilter />
                {/* <LuFilter /> */}
            </button>

            <div className="Alldropdown">
                <button onClick={toggleAllContactsDropdown} className={`Alldropdown-btn ${allContactsDropdownVisible ? 'open' : ''}`} style={{ backgroundColor: 'white', color: 'black', border: '1px solid #c8cdd2', borderWidth: '1.5px' }}>
                    All Contacts
                    <span className="triangle"></span>
                </button>
                <div className={`Alldropdown-content ${allContactsDropdownVisible ? 'show' : ''}`}>
                    <a href="#">All Contacts</a>
                    <a href="#">Mailing Labels</a>
                    <a href="#">My Contacts</a>
                    <a href="#">New Last Week</a>
                    <a href="#">New This Week</a>
                    <a href="#">Recently Created Contacts</a>
                    <a href="#">Recently Modified Contacts</a>
                    <a href="#">Unread Contacts</a>
                    <a href="#">Unsubscribed Contacts</a>
                </div>
            </div>

            {/* View button */}
            <button onClick={toggleViewDropdown} className={`dropdownn-btn ${viewDropdownVisible ? 'open' : ''}`} style={{ backgroundColor: 'white', color: 'black', border: '1px solid #c8cdd2', marginRight: '-615px', borderWidth: '1.5px', fontSize: '20px' }}>
                <FaListUl />
                <span className="triangle"></span>
            </button>
            <div className={`dropdownn-content ${viewDropdownVisible ? 'show' : ''}`}>
                <a href="#">List View</a>
                <a href="#">Kaban View</a>
            </div>

            {/* Create Contact button */}
            <button style={{ marginRight: '-615px' }} className='create-btn'>
                <Link to='/create'>Create Project</Link></button>

            <div className="dropdownnn">
                {/* Actions button */}
                <button onClick={toggleActionsDropdown} className={`dropdownnn-btn ${actionsDropdownVisible ? 'open' : ''}`} style={{ backgroundColor: '#f4f7fb', color: 'black', border: '1px solid #c8cdd2', marginRight: '-20px', borderWidth: '1.5px' }}>
                    Actions
                    <span className="triangle"></span>
                </button>
                <div className={`dropdownnn-content ${actionsDropdownVisible ? 'show' : ''}`}>
                    <a href="#">Mass Delete</a>
                    <a href="#">Mass Update</a>
                    <a href="#">Mass Email</a>
                    <a href="#">Approve Contacts</a>
                    <a href="#">Add to Campaigns</a>
                    <a href="#">Export Contacts</a>
                    <hr />
                    <a href="#">Print View</a>
                </div>
            </div>
        </div>
    );
}

export default Navbarmiddle;