import {Outlet} from 'react-router-dom';
import "../css/reset.css";
import Login from "../components/Login";
function Layout() {

    return (
        <>
            <Login/>
            <Outlet/>
        </>
    );
}

export default Layout;