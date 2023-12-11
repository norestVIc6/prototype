import "../css/SimulationLevel.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import stoplevel from "../img/stoplevel.png"
import recordlevel from "../img/recordlevel.png"
import backgroundImage1 from "../img/simulNum1.png"
import backgroundImage2 from "../img/simulNum2.png"
import backgroundImage3 from "../img/simulNum3.png"
import backgroundImage4 from "../img/simulNum4.png"
import backgroundImage5 from "../img/simulNum5.png"
import backgroundImage6 from "../img/simulNum6.png"
import backgroundImage7 from "../img/simulNum7.png"
import backgroundImage8 from "../img/simulNum8.png"
import backgroundImage9 from "../img/simulNum9.png"
import backgroundImage10 from "../img/simulNum10.png"
import sound1 from "../data/voice1.mp3";
import sound2 from "../data/voice2.mp3";
import sound3 from "../data/voice3.mp3";
function SimulationLevel (){
    const [number,setNumber] =useState(8);
    const [recordCnt,setRecordCnt] = useState(0);
    const navigate = useNavigate();
    const [btnChange,setBtnChange] = useState(true);
    const backgroundImage = [backgroundImage1, backgroundImage2, backgroundImage3, backgroundImage4, backgroundImage5, backgroundImage6
    ,backgroundImage7,backgroundImage8,backgroundImage9,backgroundImage10]
    const [voiceCnt, setVoiceCnt] = useState(0);
    const voice = [
        [sound1],
        [sound2],
        [sound3]
    ]
    const skipHandler = () =>{
        if(number >= 10){
            alert("테스트가 종료 되었습니다");
            navigate("../simulation", { state : {
                progress : number
            }})
        }else{
            setNumber(number+1);
            setVoiceCnt(voiceCnt+1)
        }
        setBtnChange(true);
        console.log(backgroundImage[number-1])
        console.log(recordlevel);
        document.getElementsByClassName("bgAI")[0].style.backgroundImage = "url('"+recordlevel+"')";
        document.getElementsByClassName("bgAI")[0].style.height = "88%";
        setRecordCnt(0);
    }
    useEffect(()=>{
        document.getElementsByClassName("sm_level_bg")[0].style.backgroundImage = "url('"+backgroundImage[number-1]+"')";
    },[number])
    const audioPlay = () =>{
        const audio = new Audio(voice[voiceCnt])
        audio.play();
    }
    
    
    const recordingStart = () =>{
        if(btnChange){
            document.getElementsByClassName("bgAI")[0].style.backgroundImage = "url('"+stoplevel+"')";
            document.getElementsByClassName("bgAI")[0].style.height = "83%";
        }else{
            document.getElementsByClassName("bgAI")[0].style.backgroundImage = "url('"+recordlevel+"')";
            document.getElementsByClassName("bgAI")[0].style.height = "88%";
        }
        if(recordCnt >0){
            skipHandler();
        }else{
        setRecordCnt(recordCnt+1);
        setBtnChange(!btnChange)
        }
    }
    return (
        <>
            <div className="SimulationLevelContainer">
                <div className="sm_level">
                    <div className="sm_level_bg"></div>
                    <div className="sm_level_btn">
                        <ul>
                            <li onClick={audioPlay}></li>
                            <li onClick={recordingStart} className="bgAI"></li>
                            <li onClick={skipHandler}></li>
                        </ul>
                        <p> {number} / 10</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default SimulationLevel