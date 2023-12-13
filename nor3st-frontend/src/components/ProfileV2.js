import "../css/profilev2.css";
import { useState, useEffect, useRef } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { requestMemberInfo } from "../apis/MemberAPI";
import EditAccount from "./EditAccount";

import userData from '../json_data/users.json'
import scoreData from '../json_data/score_data.json'

import Cookies from 'js-cookie';


function Profile() {
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const usernameRef = useRef();
    const departmentRef = useRef();

    const [listeningScore, setListeningScore] = useState(0)
    const [speakingScore, setSpeakingScore] = useState(0)
    const [simulationScore, setSimulationScore] = useState(0) 

    const showModal = () => {
        setProfileModalOpen(true);
    }

    const educationPageHandler = () => {
        window.location.href = '/education';
    }

    useEffect(() => {
        // getMemberInfo();
        let user = getUser(1)
        usernameRef.current.innerHTML = user.user_name
        departmentRef.current.innerHTML = user.department
        updateScore();
    }, []);

    // const getMemberInfo = async () => {
    //     const response = await requestMemberInfo();
    //     usernameRef.current.innerHTML = response.data.username;
    //     departmentRef.current.innerHTML = response.data.department;
    // }

    const getUser = (user_id) =>{
        const entire_user =  JSON.parse(JSON.stringify(userData)).users;
        return entire_user.find(user => user.id === user_id) || null
    }

    const listeningPageHandler = () => {
        window.location.href = '/listen';
    }

    const getCurrentScore = (user_id) =>{
        const scores = JSON.parse(JSON.stringify(scoreData)).scores;
        return scores.find(score => score.user_id === user_id) || null
    }

    const updateScore = () => {
        const listen_score = Cookies.get("listening_total_score") || 0
        const speaking_score = Cookies.get("speaking_total_score") || 0
        const simulation_score = Cookies.get("simulation_total_score") || 0

        setListeningScore(Number(listen_score))
        setSpeakingScore(Number(speaking_score))
        setSimulationScore(Number(simulation_score))
    }

    return (
        <div className="w100r h92r displayf jcC profileContainerV2" >
            <div className='profilev2bg'></div>
            <div className="profileborderV2 scroll">
                <div className="profileContentV2">
                    <div className="profileContent_leftV2">
                        <ul>
                            <li></li>
                            <li><input placeholder="status messageV2" /></li>
                            <li ref={usernameRef}>Name</li>
                            <li ref={departmentRef}>Team</li>
                        </ul>
                        <ul>
                            <li>
                                <h2>MY STUDY NOTE</h2>
                            </li>
                            <li>OVERALL SCORE</li>
                            <li>SPEAKING TEST</li>
                            <li>LISTENING TEST</li>
                            <li>LISTENING PRACTICE</li>
                            <li>SIMULATION TEST</li>
                        </ul>
                    </div>
                    <div className="profileContent_rightV2">
                        <div className="profileContent_topV2">
                            <ul>
                                <li>My class</li>
                                <li onClick={showModal}>My account</li>
                            </ul>
                        </div>
                        <div className="profileContent_bottomV2">
                            <ul>
                                <li>
                                    <ul>
                                        <li onClick={educationPageHandler}>Speaking <i>&gt;</i></li>
                                        <li>
                                            <p>Progress</p>
                                            <PieChart data={[
                                                {
                                                    value: speakingScore,
                                                    color: "#70cfeb",
                                                },
                                            ]}
                                                reveal={speakingScore} //퍼센트
                                                lineWidth={21}
                                                background="#f3f3f3"
                                                lengthAngle={360}
                                                rounded
                                                animate
                                                startAngle={270}
                                                label={({ dataEntry }) => dataEntry.value + "%"}
                                                labelStyle={{
                                                    fontSize: "0.8vw",
                                                    fill: "#CEC4E8",
                                                    fontWeight: "bold",
                                                }}
                                                labelPosition={0}
                                            />
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li onClick={listeningPageHandler}>Listening <i>&gt;</i></li>
                                        <li>
                                            <p>Progress</p>
                                            <PieChart data={[
                                                {
                                                    value: listeningScore,
                                                    color: "#70cfeb",
                                                },
                                            ]}
                                                reveal={listeningScore}  //퍼센트
                                                lineWidth={21}
                                                background="#f3f3f3"
                                                lengthAngle={360}
                                                rounded
                                                animate
                                                startAngle={270}
                                                label={({ dataEntry }) => dataEntry.value + "%"}
                                                labelStyle={{
                                                    fontSize: "0.8vw",
                                                    fill: "#CEC4E8",
                                                    fontWeight: "bold",
                                                }}
                                                labelPosition={0}
                                            />
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>Simulation<i>&gt;</i></li>
                                        <li>
                                            <p>Progress</p>
                                            <PieChart data={[
                                                {
                                                    value: simulationScore,
                                                    color: "#70cfeb",
                                                },
                                            ]}
                                                reveal={simulationScore} //퍼센트
                                                lineWidth={21}
                                                background="#f3f3f3"
                                                lengthAngle={360}
                                                rounded
                                                animate
                                                startAngle={270}
                                                label={({ dataEntry }) => dataEntry.value + "%"}
                                                labelStyle={{
                                                    fontSize: "0.8vw",
                                                    fill: "#CEC4E8",
                                                    fontWeight: "bold",
                                                }}
                                                labelPosition={0}
                                            />
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
            {profileModalOpen && <EditAccount setProfileModalOpen={setProfileModalOpen} username={usernameRef.current.innerHTML} department={departmentRef.current.innerHTML} />}
        </div>
    );
}

export default Profile;