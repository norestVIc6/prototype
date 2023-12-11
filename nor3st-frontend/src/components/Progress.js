import { Link, Outlet,useLocation} from "react-router-dom";
import {PieChart} from "react-minimal-pie-chart";
import "../css/Progress.css"
function DashBoardMain() {
    const today = new Date();

    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    return (
        <div className="ProgressContainer">
            <div className="ProgressMain">
                <ul>
                    <li>Progress Speaking</li>
                    <li>
                        <ul>
                            <li>
                                <p>1st weak</p>
                                <div>
                                    <button>Ch01</button>
                                    <button>Ch02</button>
                                    <button>Ch03</button>
                                    <button>Ch04</button>
                                    <button>Ch05</button>
                                </div>
                            </li>
                            <li>
                                <p>2st weak</p>
                                <div>
                                    <button>Ch01</button>
                                    <button>Ch02</button>
                                    <button>Ch03</button>
                                    <button>Ch04</button>
                                    <button>Ch05</button>
                                </div>
                            </li>
                            <li>
                                <p>3st weak</p>
                                <div>
                                    <button>Ch01</button>
                                    <button>Ch02</button>
                                    <button>Ch03</button>
                                    <button>Ch04</button>
                                    <button>Ch05</button>
                                </div>
                            </li>
                            <li>
                                <p>4st weak</p>
                                <div>
                                    <button>Ch01</button>
                                    <button>Ch02</button>
                                    <button>Ch03</button>
                                    <button>Ch04</button>
                                    <button>Ch05</button>
                                </div>
                            </li>
                        </ul>
                        <div>
                        <PieChart data={[
                                {
                                    value : 35,
                                    color : "#002a68",
                                },
                            ]}
                            reveal = { 35 } //퍼센트
                            lineWidth ={33}
                            background = "#2e5ca3"
                            lengthAngle = {360}
                            animate
                            startAngle={90}
                            label={({ dataEntry }) => dataEntry.value + "%"}
                            labelStyle={{
                                fontSize : "0.8em",
                                fontWeight : "bold",
                                fill : "#333333",
                            }}
                            labelPosition = {0}
                        />
                        </div>
                    </li>
                    <li>Progress Listening</li>
                    <li>
                        <ul>
                            <li>
                                <p>1st weak</p>
                                <div>
                                    <button>Ch01</button>
                                    <button>Ch02</button>
                                    <button>Ch03</button>
                                    <button>Ch04</button>
                                    <button>Ch05</button>
                                </div>
                            </li>
                            <li>
                                <p>2st weak</p>
                                <div>
                                    <button>Ch01</button>
                                    <button>Ch02</button>
                                    <button>Ch03</button>
                                    <button>Ch04</button>
                                    <button>Ch05</button>
                                </div>
                            </li>
                            <li>
                                <p>3st weak</p>
                                <div>
                                    <button>Ch01</button>
                                    <button>Ch02</button>
                                    <button>Ch03</button>
                                    <button>Ch04</button>
                                    <button>Ch05</button>
                                </div>
                            </li>
                            <li>
                                <p>4st weak</p>
                                <div>
                                    <button>Ch01</button>
                                    <button>Ch02</button>
                                    <button>Ch03</button>
                                    <button>Ch04</button>
                                    <button>Ch05</button>
                                </div>
                            </li>
                        </ul>
                        <div>
                        <PieChart data={[
                                {
                                    value : 72,
                                    color : "#002a68",
                                },
                            ]}
                            reveal = { 72 } //퍼센트
                            lineWidth ={33}
                            background = "#2e5ca3"
                            lengthAngle = {360}
                            animate
                            startAngle={90}
                            label={({ dataEntry }) => dataEntry.value + "%"}
                            labelStyle={{
                                fontSize : "0.8em",
                                fontWeight : "bold",
                                fill : "#333333",
                            }}
                            labelPosition = {0}
                        />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default DashBoardMain;