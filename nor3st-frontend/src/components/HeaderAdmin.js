import { useState } from 'react';
import '../css/headerAdmin.css';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'


function Header() {

    return (
        <div className="w100r h8r border-bottom bg" style={{ backgroundColor: '#3b5378' }}>
            <div className="displayf jcSB h100r">
                <div className="logoAdmin">
                    SSAL
                </div>
                <ul className="w30r displayf fdR jcSE fz18x aiE padding-bottom10 header adminheader" >
                    <li>
                        <Link to={"/"}>
                        DashBoard
                        </Link>
                    </li>
                    <li>
                    <Link to={"/"} >
                        Simulation
                        </Link>
                    </li>
                    <li>
                        <Link to={"/"} >
                        SSAL
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;