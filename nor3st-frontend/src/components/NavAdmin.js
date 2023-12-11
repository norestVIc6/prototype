import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'
import "../css/navAdmin.css"

function NavAdmin() {
    const [menuStatus,setMenuState] = useState(false);
    const onclickhandler = (e) =>{
        console.log(e);
        if(!menuStatus){
            // e.target.parentNode.childNodes[1].style.display = 'none';
            e.target.parentNode.childNodes[1].style.visibility = 'hidden';
            e.target.parentNode.childNodes[1].style.height = '0em';
            e.target.parentNode.childNodes[1].style.opacity = '0';
        }else{
            e.target.parentNode.childNodes[1].style.visibility = 'visible';
            e.target.parentNode.childNodes[1].style.height = '10em';
            e.target.parentNode.childNodes[1].style.opacity = '1';
            // e.target.parentNode.childNodes[1].style.display = 'flex';
        }
        setMenuState(!menuStatus);
    }


    return (
        <div className='adminNav'>
            <div className='adminNav_container'>
                <ul>
                    <li>SSAL</li>
                    <li>
                        <ul>
                            <li className='depsMenu'>
                                <p><Link to={"/admin/dashboard/"}>Dashboard</Link></p>
                                <ul>
                                    <li><Link to={"/admin/dashboard/Analytics"}><i>#</i>Analytics</Link></li>
                                    <li><Link to={"/admin/dashboard/Ranking"}><i>#</i>Ranking</Link></li>
                                    <li><Link to={"/admin/dashboard/Progress"}><i>#</i>Progress</Link></li>
                                </ul>
                            </li>
                            <li><Link to={"/admin/Members/"}>Members</Link></li>
                            <li>Simulation<br/>Result</li>
                            <li>Simulation<br/>Test Room</li>
                        </ul>
                    </li>
                    <li><h3>Contact SSAL</h3></li>
                </ul>
            </div>
        </div>
    );
}

export default NavAdmin;