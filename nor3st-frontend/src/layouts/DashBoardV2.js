import { Link, Outlet,useLocation} from "react-router-dom";
import "../css/dashboardV2.css";
function DashBoardV2() {        
    return (
        <div className="dashboardContainerV2">
            <div className="dashboardContainerV2_top">
                <h2>Dashboard</h2>
            </div>            
            <Outlet/>
        </div>
    );
}

export default DashBoardV2;