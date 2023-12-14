import "../css/SimulationLevel.css"
import { useEffect, useState } from "react"
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
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
import { serverIp } from "../apis/IPconfig";
import Cookies from 'js-cookie';

function SimulationLevel (){
    const  { 
        startRecording , 
        stopRecording , 
        togglePauseResume , 
        recordingBlob , 
        isRecording , 
        isPaused , 
        recordingTime , 
        mediaRecorder } = useAudioRecorder ( ) ;
    const [blob, setBlob] = useState();
    const navigate = useNavigate();
    const backgroundImage = [backgroundImage2, backgroundImage3, backgroundImage4, backgroundImage5, backgroundImage6
    ,backgroundImage7,backgroundImage8,backgroundImage9,backgroundImage10]
   
    const [isAudioPlay, setIsAudioPlay] = useState(false)
    const [currentStep, setCurrentStep] = useState(0);
    const [currentStepScore, setCurrentStepScore ] = useState(0)
    const [totalGrade, setTotalGrade ] = useState(0);
    const [questions,] = useState(["깃 충돌을 해결하는데 어떤 전략을 사용하나요? ", "깃으로 코드를 관리하면서, 버전을 효과적으로 관리할 수 있나요", "협업도구로는 주로 어떤 것을 사용하나요"])
    const [iscompleted, setIsCompleted] = useState(false)
    const voice = [
        [sound1],
        [sound2],
        [sound3]
    ]

    const skipHandler = (e) =>{
        if(currentStep + 2 >  voice.length){
            setTimeout(()=>{
                if(iscompleted){
                    alert(`테스트가 종료 되었습니다.`);
                    saveScore();
                    navigate("../simulation", { state : {
                        progress : currentStep
                    }})
                }
            }, 1000)
            
        }else{
            setTimeout(()=>{
                setCurrentStep(currentStep+1);
            }, 1000)
        }
        document.getElementsByClassName("bgAI")[0].style.backgroundImage = "url('"+recordlevel+"')";
        document.getElementsByClassName("bgAI")[0].style.height = "88%";

    }

    useEffect(()=>{
        document.getElementsByClassName("sm_level_bg")[0].style.backgroundImage = "url('"+backgroundImage[currentStep]+"')";
    },[currentStep])
    
    const audioPlay = () => {
        if (!isAudioPlay) {
            setIsAudioPlay(true);

            const audio = new Audio(voice[currentStep]);
            audio.play();

            audio.onended = () => {
                setIsAudioPlay(false);
            };
        }
    };

    const saveScore = () => {
        const score = Math.floor(totalGrade * 100 / voice.length)
        Cookies.set("simulation_total_score", score )
    }
    const setScore = async () =>{
        try {
            const isPassed = await getScore();
            if(isPassed){
                setTotalGrade(totalGrade + 1);
            }
        } catch (error) {
            console.error("Error while getting score:", error);
        }finally{
            setIsCompleted(true)
        }

    }
    useEffect(()=>{
    },[totalGrade, setTotalGrade, iscompleted, setIsCompleted])
    

    const getScore = async () =>{
        if(recordingBlob){
            const formData = new FormData();
            const recordedBlob = new Blob([recordingBlob], { type: 'audio/mp3' })
            formData.append("voice", recordedBlob, "simulation_voice.mp3")
            formData.append("question", questions[currentStep])
            console.log(recordedBlob)
            setIsCompleted(false)
            const getScoreFromAIServer = await fetch(`${serverIp}/simulation/question_text`,
            {
                method: 'POST',
                body: formData
            })

            if (getScoreFromAIServer.ok) {
                const jsonResponse = await getScoreFromAIServer.json();
                return jsonResponse["answer"]
            } else {
                console.error('Failed to fetch data from the server:', getScoreFromAIServer.status);
            }

        }
    }
    useEffect(()=>{
        setBlob(recordingBlob);
        if(!recordingBlob){
            return
        }
        if(stopRecording){
            setScore()
        }
    }, [recordingBlob])
    
    const recordingStart = (e) =>{
        if(!isRecording){
            startRecording(e)
            document.getElementsByClassName("bgAI")[0].style.backgroundImage = "url('"+stoplevel+"')";
            document.getElementsByClassName("bgAI")[0].style.height = "83%";
            
        }else{
            stopRecording(e)
            document.getElementsByClassName("bgAI")[0].style.backgroundImage = "url('"+recordlevel+"')";
            document.getElementsByClassName("bgAI")[0].style.height = "88%";
            skipHandler(e)
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
                        <p> {currentStep + 1} / {voice.length}</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default SimulationLevel