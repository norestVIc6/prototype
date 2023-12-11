import { Link, Outlet,useLocation} from "react-router-dom";
import "../css/dashboard.css";

function DashBoard() {        
    const { pathname } = useLocation();
    return (
        <div className="dashboardContainer">
            <div className="dashboardContainer_left">
                <ul>
                    <li>DashBoard</li>
                    <li>
                        <ul>
                            <li><Link to={"/dashboard/Members"} style={{ color: pathname === '/dashboard/Members' ? '#3b5378' : 'white' }}>Members</Link></li>
                            <li>Analytics</li>
                            <li><Link to={"/dashboard/Rankings"} style={{ color: pathname === '/dashboard/Rankings' ? '#3b5378' : 'white' }}>Ranking</Link></li>
                            <li>Progress</li>
                            <li>Simulation<br/>result</li>
                            <li>Conference<br/>Room</li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li>Comment</li>
                            <li>Contact SSAL</li>
                        </ul>
                    </li>
                </ul>
                <div className="dashboardContainer_hr">
                </div>
            </div>
            
            <Outlet/>
        </div>
    );
}

export default DashBoard;