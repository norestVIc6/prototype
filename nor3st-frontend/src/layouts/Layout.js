import {Outlet} from 'react-router-dom';
import Header from '../components/Header';
import "../css/reset.css";
function Layout() {

    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
}

export default Layout;