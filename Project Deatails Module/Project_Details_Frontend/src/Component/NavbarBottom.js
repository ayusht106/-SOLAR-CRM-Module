import { React } from 'react';
import '../Css/NavbarBottom.css';
import { TfiAnnouncement } from 'react-icons/tfi';
import { FaRegNoteSticky } from "react-icons/fa6";
import { IoMdAlarm } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import { IoHelp } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";

function Navbarbottom(){

    return(
        <div>
            <div className='Navbarb'>
            <ul className='ull'>
                <li className='lii'><TfiAnnouncement className='icc'/></li>
                <li className='lii'><FaRegNoteSticky className='icc'/></li>
                <li className='lii'><IoMdAlarm className='icc'/></li>
                <li className='lii'><MdHistory className='icc'/></li>
                <li className='liii'><IoHelp className='iccc'/>Help</li>
                <li className='lii'><GiNotebook className='icc'/></li>
            </ul>
            </div>
        </div>
    )
}

export default Navbarbottom;
