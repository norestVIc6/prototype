import {Outlet} from 'react-router-dom';
import "../css/reset.css";
import Nav from "../components/NavAdmin";
function Layout() {

    return (
        <>
            <div className='adminForm'>
                <Nav/>
                <Outlet/>
            </div>
        </>
    );
}

export default Layout;