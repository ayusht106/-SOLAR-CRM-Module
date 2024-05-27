import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CiSearch, CiCalendarDate, CiSettings } from "react-icons/ci";

function Navbar() {
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const onChange = (newDate) => {
        setDate(newDate);
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    return (
        <div>
            {showCalendar && (
                <div className="calendar-container">
                    <Calendar
                        onChange={onChange}
                        value={date}
                    />
                </div>
            )}
            <nav>
                <div className="title">CRM</div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Leads</Link></li>
                    <li><Link to="/">Contacts</Link></li>
                    <li><Link to="/">Accounts</Link></li>
                    <li><Link to="/">Deals</Link></li>
                    <li><Link to="/">Tasks</Link></li>
                    <li className="dropdown" onClick={toggleDropdown}>
                       ...
                        {showDropdown && (
                            <ul className="dropdown-content">
                                <li className="ab"><Link to="/">Option 1</Link></li>
                                <li className="ab"><Link to="/">Option 2</Link></li>
                                <li className="ab"><Link to="/">Option 3</Link></li>
                            </ul>
                        )}
                    </li>
                    <li className="rig"><CiSearch /></li>
                    <li onClick={toggleCalendar} className="icon"><CiCalendarDate /></li>
                    <li className="icon"><CiSettings /></li>

                </ul>
            </nav>
        </div>
    );
}

export default Navbar;