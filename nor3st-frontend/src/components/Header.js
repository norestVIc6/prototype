import { useState } from 'react';
import '../css/header.css';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'
import {CheckAvater} from '../apis/UploadAPI';
import ImgUploadComponent from './ImgUploadComponent';
function Header() {
    const { pathname } = useLocation();
    const [modalOpen, setModalOpen] = useState(false);


    const showModal = () => {
        const test = CheckAvater();
        if(test === false || test === undefined || test ==null) {

        }else{
            setModalOpen(true);
        }
    }


    return (
        <div className="w100r h8r border-bottom bg" style={{ backgroundColor: pathname === '/' ? 'white' : '#3b5378' }}>
            <div className="displayf jcE h100r">
                <ul className="w25r displayf fdR jcSE fz18x aiE padding-bottom10 header" >
                    <li>
                        <Link to={"/"} className='cblack' onClick={showModal} style={{ color: pathname === '/' ? 'black' : 'white' }}>
                        Home
                        </Link>
                    </li>
                    <li>
                    <Link to={"/login"} className='cblack' style={{ color: pathname === '/' ? 'black' : 'white' }}>
                        Sign in
                        </Link>
                    </li>
                    <li>
                        <Link to={"/register"} className='cblack' style={{ color: pathname === '/' ? 'black' : 'white' }}>
                        Contact us
                        </Link>
                    </li>
                </ul>
            </div>
            {modalOpen && <ImgUploadComponent setModalOpen={setModalOpen}/> }
        </div>
    );
}

export default Header;