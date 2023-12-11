import "../css/profile.css";
import { useState, useEffect, useRef } from "react";
import { requestMemberInfo } from '../../apis/MemberAPI';
import { loginCheck } from "../../apis/login/LoginAPI";
import EditAccount from "../../components/EditAccount";
function Profile() {
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    const empName = useRef();
    const empTeam = useRef();

    useEffect(() => {  

        loginCheck();

        callMemberInfo();   
    }, []);

    const callMemberInfo = async () => {
        const response = await requestMemberInfo();

        empName.current.innerHTML = response.data.employeeName;
        empTeam.current.innerHTML = response.data.department;

        console.log(response);
    }

    const showModal = () => {
        setProfileModalOpen(true);
    }

    return (
        <div className="w100r h92r displayf jcC profileContainer" >
            <div className="profileborder scroll">
                <div className="profileContent">
                    <div className="profileContent_left">
                        <ul>
                            <li></li>
                            <li><input placeholder="status message"/></li>
                            <li>Name</li>
                            <li>Team</li>
                        </ul>                  
                    </div>
                    <div className="profileContent_right">
                        <div className="profileContent_top">
                            <ul>
                                <li>My class</li>
                                <li onClick={showModal}>My account</li>
                            </ul>
                        </div>
                        <div className="profileContent_bottom">
                            <div className="profileContent_four">
                                <ul>
                                    <li>Daily words</li>
                                    <li>Daily sents</li>
                                    <li>Simulation</li>
                                </ul>
                                <ul>
                                    <li>말하기</li>
                                    <li>듣기</li>
                                </ul>
                            </div>
                            <div className="profileContent_under">
                                <ul>
                                    <li>
                                        <h2>MY STUDY NOTE</h2>
                                    </li>
                                    <li>OVERALL SCORE</li>
                                    <li>SPEAKING TEST</li>
                                    <li>LISTENING TEST</li>
                                    <li>LISTENING PRACTICE(level 2에서 진행 예정)</li>
                                    <li>SIMULATION TEST</li>
                                </ul>
                                <ul>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {profileModalOpen && <EditAccount setProfileModalOpen={setProfileModalOpen}/> }
        </div>
    );
}

export default Profile;