import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../Css/Navbar.css';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { CiSearch, CiCalendarDate, CiSettings } from "react-icons/ci";
import { CgProfile } from 'react-icons/cg';

function Navbar() {
    // const [date, setDate] = useState(new Date());
    // const [showCalendar, setShowCalendar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    // const onChange = (newDate) => {
    //     setDate(newDate);
    // };

    // const toggleCalendar = () => {
    //     setShowCalendar(!showCalendar);
    // };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".navbar-container")) {
                setShowDropdown(false);
            }
        };


        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="navbar-container">
            {/* {showCalendar && (
                <div className="calendar-container">
                    <Calendar
                        onChange={onChange}
                        value={date}
                    />
                </div>
            )} */}
            <nav>
                <div className="title">SMS</div>
                <ul>
                    <li className="l"><Link to="/table">Home</Link></li>
                    <li className="l"><Link to="/">Leads</Link></li>
                    <li className="l"><Link to="/">Contacts</Link></li>
                    <li className="l"><Link to="/">Accounts</Link></li>
                    <li className="l"><Link to="/">Deals</Link></li>
                    <li className="l"><Link to="/">Tasks</Link></li>
                    <li className="dropdown" onClick={toggleDropdown}>
                       ...
                        {showDropdown && (
                            <ul className="dropdown-content">
                                <li className="abc"><Link to="/">Meeting</Link></li>
                                <li className="ab"><Link to="/">Reports</Link></li>
                                <li className="ab"><Link to="/">Projects</Link></li>
                                <li className="ab"><Link to="/">Reports</Link></li>
                                <li className="ab"><Link to="/">Documents</Link></li>
                            </ul>
                        )}
                    </li>
    
                    <li className="rig"><CiSearch /></li>
                    <li className="icon"><CiCalendarDate /></li>
                    <li className="icon"><CiSettings /></li>
                    <li className="icon"><CgProfile /></li>
             
                    
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;