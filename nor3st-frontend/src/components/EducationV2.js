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
        const [similarity, setSimilarity] = useState(0);
        const [isAudioPlay, setIsAudioPlay] = useState(false);
        const [vietContents,setVietContents] = useState(null);
        const [koreanContent,setKoreanContent] = useState(null);
        const [id,setID] = useState(null);
        let audio;
        const [saveAudio,setSaveAudio] = useState(new Audio());
        const [currentStep, setCurrentStep] = useState(0);


        const getQuestions = () => {
            const questions = JSON.parse(JSON.stringify(lecture)).questions;
            return questions
        }
        const get_mp3_file_to_blob = async (currentStep) =>{

                // Fetch the MP3 file
                const response = await fetch(`/${currentStep}`);
                // Convert the response to ArrayBuffer
                const musicArrayBuffer = await response.arrayBuffer();
                console.log(musicArrayBuffer)
                // Create a Blob from the ArrayBuffer
                const musicBlob = new Blob([musicArrayBuffer], { type: 'audio/mp3' });
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
            // const data =  async() =>{
            //     const data = await getMyDailyTasks();

            //     setVietContents(data.data[4].vietContent);
            //     setKoreanContent(data.data[4].koreanContent)
            //     setID(data.data[4].solvedId)       
            //     const url = await getMyDailyAudio(data.data[4].audioUrl)
            //     setAudioBlob(url);

            // }
            // data();
            const data = async (currentStep) =>{
                const questions = getQuestions()
                const currentBlob =  await get_mp3_file_to_blob(questions[currentStep].file_path)
                setKoreanContent(questions[currentStep].speaking_sentence)
                setVietContents(questions[currentStep].viet)
                setID(questions[currentStep].question_id)
                setAudioBlob(currentBlob)
            }
            data(currentStep)
        },[currentStep])

        const [gauge, setGauge] = useState(20);
        const gaugerHandle = (event) =>{
            console.log(event)
            if(event.target.innerText === 'prev'){
                if(gauge > 20){
                    setGauge(gauge-20)
                    setCurrentStep(currentStep-1)
                    setSimilarity(0)
                    setBlob()
                    
                }
                
            }else if(event.target.innerText === 'next'){
                if(gauge < 100){
                    setGauge(gauge+20)
                    setCurrentStep(currentStep+1)
                    setSimilarity(0)
                    setBlob()
                }
            }
        }

        useEffect(() => {
            setBlob(recordingBlob);
            // compareBlobs();
            saveRecording();
            if ( ! recordingBlob ){
                
                return  
            } ;
        },[ recordingBlob ])

        const saveRecording = async () => {
            if (recordingBlob) {
                const audioBlob = new Blob([recordingBlob], { type: 'audio/mp3' });                
                // const audioBlob = new File([recordingBlob],"file", { type: 'audio/mpeg' });
                // console.log(audioBlob);              
                // const downloadLink = document.createElement('a');
                // downloadLink.href = window.URL.createObjectURL(audioBlob);
                // downloadLink.download = 'recorded_audio.wav';
                // downloadLink.click();
                const response = await sendRecord(id,audioBlob, koreanContent)

                console.log(response);

                setSimilarity(response);
            }
        }

        const compareBlobs = () => {
            if (audioBlob && recordingBlob) {
                calculateBlobSimilarity(audioBlob, recordingBlob)
                .then((result) => {
                    setSimilarity(result*1000);
                })
                .catch((error) => {
                    console.error('오류 발생:', error);
                });
            }
        };

    const calculateBlobSimilarity = (blob1, blob2) => {
        return new Promise((resolve, reject) => {
            const reader1 = new FileReader();
            const reader2 = new FileReader();
        reader1.onload = (e) => {
            const data1 = new Uint8Array(e.target.result);
            reader2.onload = (e) => {
                const data2 = new Uint8Array(e.target.result);
                const similarity = calculateByteArraySimilarity(data1, data2);
                resolve(similarity);
            };
            reader2.readAsArrayBuffer(blob2);
        };
        reader1.readAsArrayBuffer(blob1);
        });
    };

    const calculateByteArraySimilarity = (arr1, arr2) => {
    // if (arr1.length !== arr2.length) {
    //     throw new Error('배열 길이가 다릅니다.');
    // }

    let diffCount = 0;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
        diffCount++;
        }
    }

    const totalBytes = arr1.length;
    const similarityNumber= 1 - diffCount / totalBytes;
    console.log(similarityNumber);
    return similarityNumber.toFixed(3);
    };
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
                                        <li><div className='gauge' style={{width : gauge+"%" }}></div></li>
                                        <li><button onClick={gaugerHandle}>prev</button><button onClick={gaugerHandle}>next</button></li>
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
                                            value : similarity,
                                            color : "#3568b7",
                                        },
                                    ]}
                                    reveal = { similarity } //퍼센트
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
                                        <li >{koreanContent}</li>
                                        <li>({vietContents})</li>
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