import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {Link} from 'react-router-dom'
import {PieChart} from "react-minimal-pie-chart";
import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { getMyDailyTasks,getMyDailyAudio, sendRecord } from '../apis/SolvedAPI';
import getBlobDuration from 'get-blob-duration'
import '../css/educationV2.css';
import { faL } from '@fortawesome/free-solid-svg-icons';
import lecture from '../json_data/question.json'
import { serverIp } from '../apis/IPconfig';
import Cookies from 'js-cookie';


function EducationV2() {
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
        const [audioBlob, setAudioBlob] = useState(null);         
        const [audioUrl, setAudioUrl] = useState(null);
        const [compareData, setCompareData] = useState(null);
        const [isAudioPlay, setIsAudioPlay] = useState(false);
        const [viet,setViet] = useState("");
        const [korean,setKorean] = useState("");

        let audio;
        const [saveAudio,setSaveAudio] = useState(new Audio());
        const [currentStep, setCurrentStep] = useState(0);
        const [allQuestion, setAllQuestion] = useState([]);

        const [gaugeUnit, setGaugeUnit] = useState(0)
        const [gradeUnit, setGradeUnit] = useState(0)
        const [currentGauge, setCurrentGauge] = useState(0)
        const [maxGauge, ] = useState(100)

        const [currentStepScore, setCurrentStepScore ] = useState(0)
        const [totalGrade, setTotalGrade ] = useState(0);

        const init = () => {
            const questions = getQuestions()
            const gaugeInit = Number(100 / questions.length);
            setCurrentStep(0)
            setTotalGrade(0)
            setCurrentStepScore(0)
            setBlob(null)
            setGaugeUnit(gaugeInit);
            setGradeUnit(gaugeInit); //gauge 와 동일하게 증가해야함
            setCurrentGauge(gaugeInit);
        }

        useEffect(()=>{
            init()
        }, [])

        const prevButton = (e) => {
            if(currentGauge > 0){
                setCurrentGauge(currentGauge - gaugeUnit);
                setCurrentStep(currentStep - 1)
            }
        }

        const nextButton = (e) => {

            if(currentStepScore < 60){
                alert('60점을 넘지 못했습니다!')
            }else{
                moveNextStep(e)
            }
        }

        const moveNextStep = (e) => {
            if(currentGauge < maxGauge && currentStep < allQuestion.length -1){
                setCurrentGauge((prevGauge) => prevGauge + gaugeUnit);
                setCurrentStep((prevStep) => prevStep + 1);
                setCurrentStepScore(0)
                setBlob(null)
            }else{
                saveTotalScore();
                window.location.href = "/profile"
            }
        }


        const getQuestions = () => {
            const questions = JSON.parse(JSON.stringify(lecture)).questions;
            return questions
        }
        const get_mp3_file_to_blob = async (filepath) =>{

                // Fetch the MP3 file
                const response = await fetch(`${filepath}`);
                console.log(response)
                // Convert the response to ArrayBuffer
                const musicArrayBuffer = await response.arrayBuffer();
                // Create a Blob from the ArrayBuffer
                const musicBlob = new Blob([musicArrayBuffer], { type: 'audio/wav' });
                return musicBlob;
        }

        const playBlob = async() => {
            clearTimeout(timeout)
            if (audioBlob) {
                const url = URL.createObjectURL(audioBlob);
                let ash;
                const blobtime = await getBlobDuration(audioBlob)
                
                if(audioBlob !== compareData){
                    setAudioUrl(url);
                    audio = new Audio(url);
                    setCompareData(audioBlob);
                    setSaveAudio(audio);
                    audioPlayHandler(audio);
                    
                }else{
                    audioPlayHandler(saveAudio);
                }

                
            };
        }
        const audioPlayHandler = async(audio) =>{
            if(isAudioPlay){
                audio.pause();
                setIsAudioPlay(false)
            }else{      
                audio.play();
                setIsAudioPlay(true)
                const blobtime = await getBlobDuration(audioBlob)
                await timeout(blobtime*1000)
                setIsAudioPlay(false)  
                   
            }
        }
        function timeout(delay) {
            return new Promise( res => {
                setTimeout(res, delay);
            });
        }


        useEffect(() => {       
            const data = async (currentStep) =>{
                const questions = getQuestions()
                setAllQuestion([...questions])
                const currentBlob =  await get_mp3_file_to_blob(questions[currentStep].file_path)
                setKorean(questions[currentStep].speaking_sentence)
                setViet(questions[currentStep].viet)
                setAudioBlob(currentBlob)
            }
            data(currentStep)
        },[currentStep])

        useEffect(() => {
            setBlob(recordingBlob);
            // compareBlobs();
            if ( ! recordingBlob ){
                
                return  
            }
            if(stopRecording){
                setScore()
            }
        },[ recordingBlob])

        useEffect(()=>{
            setTotalGrade(totalGrade + currentStepScore)
        },[currentStepScore, setTotalGrade])

    const getPronounce = async () =>{
        if (recordingBlob) {
            const formData = new FormData();
            const recordedBlob = new Blob([recordingBlob], { type: 'audio/mp3' }); 
            formData.append("voice", recordedBlob, "voice");

            const getScoreFromAIServer = await fetch(`${serverIp}/get_pronounce`,
                                    {   
                                        method: 'POST',
                                        body: formData,
                                    })
            if (getScoreFromAIServer.ok) {
                const jsonResponse = await getScoreFromAIServer.json();
                return jsonResponse
            } else {
                console.error('Failed to fetch data from the server:', getScoreFromAIServer.status);
            }
            
        }
    }

    const setScore = async () => {
        let score = 100

        const pronounced = await getPronounce()

        if (pronounced && pronounced.answer) { 
            const answer = pronounced.answer
            let korean_list = korean.split(" ");
            console.log(pronounced.answer)
            for (let i = 0; i < korean_list.length; i++) {
                if (!answer.includes(korean_list[i])) {
                    score -= 10
                }
            }
            if(score < 0){
                score = 0
            }
            setCurrentStepScore(score)
            setTotalGrade(totalGrade+currentStepScore)
        }
        else{
           score = 0
           setCurrentStepScore(score)
           setTotalGrade(totalGrade+currentStepScore)
        }
        return score
    }

    const saveTotalScore = () =>{
        const totalSpeakingGrade = Number(totalGrade/allQuestion.length)
        Cookies.set("speaking_total_score", totalSpeakingGrade )
    }



    return (
        <div className='educationContainer'>
            <div className='educationbg'></div>
            <div className='educationMain'>            
            </div>
            <div className='educationMain_left'>
                <h3>SSAL</h3>
                <ul>
                    <li>Studying<br/>guide</li>
                    <li>Daily words</li>
                    <li>Daily sents</li>
                    <li>Listening</li>
                    <li>Review</li>
                    <li>Score</li>
                    <li><i></i></li>
                </ul>
            </div>
            <div className='educationMain_right'>
                    <div>
                        <div className='educationMain_top'>
                            <ul>
                                <li>The Best way to improve your<br/>Korean</li>
                                <li>
                                    <ul>
                                        <li><div className='gauge' style={{width : currentGauge+"%" }}></div></li>
                                        <li>{/*<button onClick={prevButton}>prev</button>*/}<button className='nextButton' onClick={nextButton}>next</button></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className='educationMain_bottom'>
                            <div>
                                <div className='circlegraph'>
                                    <div>
                                        Chapter 1-10
                                    </div>
                                    <PieChart data={[
                                        {
                                            value : currentStepScore,
                                            color : "#3568b7",
                                        },
                                    ]}
                                    reveal = { currentStepScore } //퍼센트
                                    lineWidth ={28}
                                    background = "#f3f3f3"
                                    lengthAngle = {360}
                                    rounded
                                    animate
                                    startAngle={270}
                                    label={({ dataEntry }) => dataEntry.value + "점"}
                                    labelStyle={{
                                        fontSize : "1.1em",
                                        fill : "#ffffff",
                                        fontWeight : "bold",
                                    }}
                                    labelPosition = {0}
                                    />
                                </div>
                                <div>
                                    <ul>
                                        <li >{korean}</li>
                                        <li>({viet})</li>
                                    </ul>
                                    <div className='btnAudio'>
                                        {!isAudioPlay ? <button onClick={playBlob}>Start Playing</button> : <button onClick={playBlob}>Pause Playing</button>}
                                        {!isRecording ? <button onClick={startRecording}>RECORDING</button> : <button onClick={stopRecording}>STOP</button>}
                                    </div>
                                </div>
                            </div>
                            <div>
                                {isRecording &&  (
                                    <LiveAudioVisualizer
                                    mediaRecorder={mediaRecorder}
                                    width={"100%"}
                                    height={"60%"}
                                    barWidth={2}
                                    barSpacing={1}
                                    gap={0.7}
                                    barColor={'#3568b7'}
                                    fftSize={1024}
                                    />
                                )}
                                {!isRecording  && audioBlob && (
                                    <AudioVisualizer
                                    blob={audioBlob}
                                    width={500}
                                    height={75}
                                    barWidth={1}
                                    gap={1}
                                    barColor={'#f76565'}
                                    />
                                )}
                                {!isRecording  && blob && (
                                    <AudioVisualizer
                                    blob={blob}
                                    width={500}
                                    height={75}
                                    barWidth={1}
                                    gap={1}
                                    barColor={'#3568b7'}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default EducationV2;