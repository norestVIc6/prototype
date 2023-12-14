import "../css/Simulation.css"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import imgA from "../img/simul_selet1.png"
import imgB from "../img/simul_selet2.png"
import imgC from "../img/simul_selet3.png"
import simulationguides from "../img/simulation_guide.mp4";
function Simulation (){
    const location = useLocation();
    const [videoStatus,setVideoStatus] = useState(true);
    let number = 0;
    if(location.state!= null || location.state != undefined){
        number =  location.state.progress*10
    }
    const [menth3,setMenth3] = useState("CheatSheets");
    const [menth4,setMenth4] = useState("LeetCode's Interview Crash Course");
    const [testimg,setTestimg] = useState(imgA);
    const onChangeLevel = (e) => {
        const a = e.currentTarget.className;
        if(a.includes("level_one")){
            setMenth3("CheatSheets")
            setMenth4("LeetCode's Interview Crash Course")
            setTestimg(imgA)
        }
        if(a.includes("level_two")){
            setMenth3("Top InterView Questions")
            setMenth4("Easy Collection")
            setTestimg(imgB)
        }
        if(a.includes("level_thr")){
            setMenth3("Data Structures and Algorithms")
            setMenth4("LeetCode's Interview Crash Course")
            setTestimg(imgC)
        }
    }
    const clickHandler = (e) => {
        const event = e.currentTarget;
        if(!videoStatus){    
            event.pause();
        }else{
            event.play();
        }
        setVideoStatus(!videoStatus);        
    }
    return (
        <>
            <div className="SimulationContainer">
                <div className="SimulationContainer_left">
                    <div className="SimulationMain_bg"></div>
                    <div className="SimulationMain">
                        <div className="testimg">
                            <div>
                            <video autoPlay onClick={clickHandler}>
                                <source src={simulationguides} type="video/mp4" />
                            </video>
                            </div>
                            <h4>Chào mừng bạn đến với bài kiểm tra mô phỏng SSAL, Nghe bản ghi mẫu sau đó chọn cấp độ của bạn, bạn không thể thay đổi cấp độ của mình trong quá trình kiểm tra</h4>
                            <h3>Listen to sample recording<br/>then choose your level,<br/> you can't change your level during the test</h3>
                        </div>
                        <div className="weltest">
                            <h2>Welcome to SSAL simulation test</h2>
                            <Link to={"/test"}><div className="chooseLevel" style={{backgroundImage:"url("+testimg+")"}}>
                                <h3>
                                    {menth3}
                                </h3>
                                <h4>
                                    {menth4}
                                </h4>
                            </div>
                            </Link>
                            <div className="playlevel">
                                <div className="playbtn"></div>
                            </div>
                            <div className="level_content">
                                <ul>
                                    <li>
                                        <strong>1</strong>
                                        <p>chapter</p>
                                    </li>
                                    <li>
                                        <strong>3</strong>
                                        <p>item</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="levelprogress">
                                <p>{number > 0 ? number+" %": "0 %"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="SimulationContainer_right">
                    <div className="select level_one" onClick={onChangeLevel}>
                        <div className="level_bg">

                        </div>
                        <div className="level_ment" >
                            Level &#8544;
                        </div>
                    </div>
                    <div className="select level_two" onClick={onChangeLevel}>
                        <div className="level_bg">

                        </div>
                        <div className="level_ment">
                            Level &#8545;
                        </div>
                    </div>
                    <div className="select level_thr" onClick={onChangeLevel}>
                        <div className="level_bg">

                        </div>
                        <div className="level_ment">
                            Level &#8546;
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Simulation