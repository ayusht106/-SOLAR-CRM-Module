import React, { useState } from 'react';
import './side.css';

const Sidebar = () => {
  const [menuItems] = useState([
    'Notes',
    'Attachments',
    'Deals',
    'Contacts',
    'Emails',
    'Deals',
    'Open Activities',
    'Closed Activities',
    'Products',
    'Quotes',
    'Sales Orders',
    'Invoices',
    'Members Account',
    'Cases',
    'Social',
    // Add more menu items as needed
  ]);

  const [filteredItems, setFilteredItems] = useState([...menuItems]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleCheckboxChange = (index) => {
    // Handle checkbox state or any other logic here
    console.log(`Checkbox at index ${index} changed`);
  };

  const handleSearchChange = (searchTerm) => {
    const filtered = menuItems.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="header">
        <button className="collapse-button" onClick={toggleCollapse}>
          {isCollapsed ? '→' : '←'}
        </button>
        {!isCollapsed && 'Related List:'}
      </div>
      {!isCollapsed && (
        <div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="menu-container">
            <ul className="menu">
              {filteredItems.map((item, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <label htmlFor={`checkbox-${index}`}>{item}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;