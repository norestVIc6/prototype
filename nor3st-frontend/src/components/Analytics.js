import { Link,useLocation} from "react-router-dom";
import "../css/Analytics.css";
import {PieChart} from "react-minimal-pie-chart";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js"
  import { Line } from "react-chartjs-2"

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
function Analytics() {
    const options = {
        responsive: false,
        scales: {

            y: {
              beginAtZero: true,
              max: 100, // 최대값 설정
            },
          },
    }
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri"]

    const data = {
        labels,
        datasets: [
          {
            label: "일별 참여율",
            data: [52,54,77,52,57],
            borderColor: "rgb(145 134 214)",
            backgroundColor: "rgba(255, 255, 255, 1)"
          }
        ]
      }
    return (
        <div className="AnalyticsContainer">
            <div className="AnalyticsMain">
                <div className="Daily_Analytics">
                    <h3>Daily Analytics</h3>
                    <div>
                        <ul>
                            <li>
                                <ul>
                                    <li>Speaking</li>
                                    <li>67%</li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>Listening</li>
                                    <li>67%</li>
                                </ul>
                            </li>
                        </ul>
                        <div>
                            <p>실시간 참여율</p>
                            <PieChart data={[
                                    {
                                        value : 75,
                                        color : "#002a68",
                                    },
                                ]}
                                reveal = { 75 } //퍼센트
                                lineWidth ={33}
                                background = "#2e5ca3"
                                lengthAngle = {360}
                                animate
                                startAngle={90}
                                label={({ dataEntry }) => dataEntry.value + "%"}
                                labelStyle={{
                                    fontSize : "0.8em",
                                    fontWeight : "bold",
                                    fill : "#fff",
                                }}
                                labelPosition = {0}
                            />
                        </div>
                    </div>
                </div>
                <div className="Weekly_Analytics">
                    <h3>Weekly Analytics</h3>
                    <div>
                        <ul>
                            <li>
                                <ul>
                                    <li>Speaking</li>
                                    <li>89%</li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>Listening</li>
                                    <li>77%</li>
                                </ul>
                            </li>
                        </ul>
                        <div>
                            <p>실시간 참여율</p>
                            <PieChart data={[
                                    {
                                        value : 89,
                                        color : "#002a68",
                                    },
                                ]}
                                reveal = { 89 } //퍼센트
                                lineWidth ={33}
                                background = "#2e5ca3"
                                lengthAngle = {360}
                                animate
                                startAngle={90}
                                label={({ dataEntry }) => dataEntry.value + "%"}
                                labelStyle={{
                                    fontSize : "0.8em",
                                    fontWeight : "bold",
                                    fill : "#fff",
                                }}
                                labelPosition = {0}
                            />
                        </div>
                    </div>
                </div>
                <div className="Monthly_Analytics">
                    <h3>Monthly Analytics</h3>
                    <div>
                        <ul>
                            <li>
                                <ul>
                                    <li>Speaking</li>
                                    <li>89%</li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>Listening</li>
                                    <li>67%</li>
                                </ul>
                            </li>
                        </ul>
                        <div>
                            <p>실시간 참여율</p>
                            <PieChart data={[
                                    {
                                        value : 75,
                                        color : "#002a68",
                                    },
                                ]}
                                reveal = { 75 } //퍼센트
                                lineWidth ={33}
                                background = "#2e5ca3"
                                lengthAngle = {360}
                                animate
                                startAngle={90}
                                label={({ dataEntry }) => dataEntry.value + "%"}
                                labelStyle={{
                                    fontSize : "0.8em",
                                    fontWeight : "bold",
                                    fill : "#fff",
                                }}
                                labelPosition = {0}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;