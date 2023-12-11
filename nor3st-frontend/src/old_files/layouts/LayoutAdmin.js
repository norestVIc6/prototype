import {Outlet} from 'react-router-dom';
import "../css/reset.css";
import Header from "../../components/HeaderAdmin";
function Layout() {

    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
}

export default Layout;