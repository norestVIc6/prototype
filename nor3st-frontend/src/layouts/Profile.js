import {Outlet} from 'react-router-dom';
import "../css/reset.css";
import HeaderV2 from '../components/HeaderV2';
function Layout() {

    return (
        <>
            <HeaderV2/>
            <Outlet/>
        </>
    );
}

export default Layout;