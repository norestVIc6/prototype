import { Link,useLocation} from "react-router-dom";
import {PieChart} from "react-minimal-pie-chart";
import "../css/DashBoardMain.css"
function DashBoardMain() {
    const today = new Date();

    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    return (
        <div className="dashboardMainContainer">
            <div className="dashboardC">
                <div className="dashboard_plan">
                    <h3>Plan</h3>
                    <p>Start-Up Plan</p>
                </div>
                <div className="dashboard_account">
                    <h3>남은 계정 수 / 전체 계정 수</h3>
                    <p>30 / 50</p>
                </div>
                <div className="dashboard_today">
                    <h3>오늘의 학습 과정</h3>
                    <p>DAY 23</p>
                </div>
                <div className="dashboard_partici">
                    <h3>오늘의 사원 참여도</h3>
                    <PieChart data={[
                            {
                                value : 75,
                                color : "#87b9e8",
                            },
                        ]}
                        reveal = { 75 } //퍼센트
                        lineWidth ={18}
                        background = "#f3f3f3"
                        lengthAngle = {360}
                        rounded
                        animate
                        startAngle={0}
                        label={({ dataEntry }) => dataEntry.value + "%"}
                        labelStyle={{
                            fontSize : "1.1em",
                            fill : "#333333",
                        }}
                        labelPosition = {0}
                    />
                </div>
                <div className="dashboard_avgScore">
                    <h3>전체 사원 평균 점수</h3>
                    <p>93.5 점</p>
                    <p className="todayDate">{formattedDate}</p>
                </div>
                <div className="dashboard_simul_progress">
                    <h3>시뮬레이션 진행 상황</h3>
                    <div>
                        <p>내용</p>
                        <PieChart data={[
                                {
                                    value : 100,
                                    color : "#87b9e8",
                                },
                            ]}
                            reveal = { 100 } //퍼센트
                            lineWidth ={18}
                            background = "#f3f3f3"
                            lengthAngle = {360}
                            rounded
                            animate
                            startAngle={0}
                            label={({ dataEntry }) => dataEntry.value + "%"}
                            labelStyle={{
                                fontSize : "1.1em",
                                fill : "#333333",
                        }}
                        labelPosition = {0}
                    />
                    </div>
                </div>
                <div className="dashboard_rankScore">
                    <h3>등수별 점수</h3>
                    <div>
                        <div>
                            <p>1등</p>
                            <div>
                                <div className="PerColorOne"></div>
                            </div>
                            <p>90점</p>
                        </div>
                        <div>
                            <p>2등</p>
                            <div>
                                <div className="PerColorTwo"></div>
                            </div>
                            <p>80점</p>
                        </div>
                        <div>
                            <p>3등</p>
                            <div>
                                <div className="PerColorThr"></div>
                            </div>
                            <p>60점</p>
                        </div>
                    </div>
                </div>
                <div className="dashboard_simul_partici">
                    <h3>시뮬레이션 참여 상황</h3>
                    <p>30 명 / 50 명</p>
                </div>
            </div>
        </div>
    );
}

export default DashBoardMain;