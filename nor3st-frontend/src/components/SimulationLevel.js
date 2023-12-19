import "../css/SimulationLevel.css"
import { useEffect, useState } from "react"
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { json, useNavigate } from "react-router-dom";
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
import simulation from "../json_data/simulation.json"

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
    const [audioList, setAudioList] = useState([])
    const [totalGrade, setTotalGrade ] = useState(0);
    const [questions, setQuestions] = useState([])
    const [modelAnswers, setModelAnswers ] = useState([])
    const [iscompleted, setIsCompleted] = useState(false)

    const init = () =>{
        const question_list = getQuestions()
        const model_answer_list = getModelAnswer()
        const audio_path_list = getAudioPaths()
        setQuestions([...question_list])
        setModelAnswers([...model_answer_list])
        setAudioList([...audio_path_list])
        setCurrentStep(0)
        setTotalGrade(0)
    }

    useEffect(()=>{
        init()
    }, [])

    const getQuestions = () =>{
        const simul = JSON.parse(JSON.stringify(simulation)).simulation
        const simul_question_list = simul.map(e => e.speaking_sentence)
        return simul_question_list

    }

    const getModelAnswer = () =>{
        const simul = JSON.parse(JSON.stringify(simulation)).simulation
        const model_answer_list = simul.map(e => e.model_answer)
        return model_answer_list
    }

    const getAudioPaths = () =>{
        const simul = JSON.parse(JSON.stringify(simulation)).simulation
        const paths = simul.map(e => e.file_path)
        return paths
    }

    const skipHandler = (e) =>{
        if(currentStep + 2 >  audioList.length){
            setTimeout(()=>{
                if(iscompleted){
                    alert(`테스트가 종료 되었습니다.`);
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

            const audio = new Audio(audioList[currentStep]);
            audio.play();

            audio.onended = () => {
                setIsAudioPlay(false);
            };
        }
    };

    const saveScore = () => {
        console.log(totalGrade)
        const score = Math.floor(totalGrade * 100 / audioList.length)
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
        saveScore()
    },[totalGrade, setTotalGrade, iscompleted, setIsCompleted])
    

    const getScore = async () =>{
        if(recordingBlob){
            const formData = new FormData();
            const recordedBlob = new Blob([recordingBlob], { type: 'audio/mp3' })
            formData.append("voice", recordedBlob, "simulation_voice.mp3")
            formData.append("model_answer", modelAnswers[currentStep])
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
                        <p> {currentStep + 1} / {audioList.length}</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default SimulationLevel