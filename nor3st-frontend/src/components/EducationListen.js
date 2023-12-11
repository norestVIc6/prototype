import { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {Link} from 'react-router-dom'
import {PieChart} from "react-minimal-pie-chart";
import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { getMyDailyTasks,getMyDailyAudio, sendRecord, getDailyListenTask, postDailyListenTask } from '../apis/SolvedAPI';
import getBlobDuration from 'get-blob-duration'
import '../css/educationListen.css';
import { faL } from '@fortawesome/free-solid-svg-icons';
import sound1 from "../data/voice1.mp3";
import sound2 from "../data/voice2.mp3";
import sound3 from "../data/voice3.mp3";

function EducationV2() {
    const usenavigate = useNavigate();
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
        const audioRef = useRef(null);
        const [answer, setAnswer] = useState(null);
        const [taskList, setTaskList] = useState([]);
        const [questionIndex, setQuestionIndex] = useState(0);
        
        let cnt = 0;
        const [voiceCnt, setVoiceCnt] = useState(0);
        const quest = [
            [
                "kinh nghiệm cũng được 3 năm rồi.","Đây là thời gian phân phối mã mới.","Phải hoàn thành bài kiểm tra trước khi phân phát.","Cần phải hợp tác với đội khác.","Chúng ta sẽ chia nhau ra làm việc."
            ],
            [
                "Có công việc trước đây nào liên quan đến dự án này không?","Rất vui được gặp các bạn.","Có lẽ sẽ có lỗi trong mã này.","Các bạn hãy review code cho mình nha.","Chủ đề cuộc họp hôm nay là gì?"
            ],
            [
                "Anh có thể cho tôi chút phản hồi được không?","Hãy đề xuất phương án cải tiến.","Có lẽ việc phân phối sẽ thành công.","phân phát thế nào?"," Nhóm dự án được hình thành như thế nào?"
            ]
        ];
        const voice = [
            [sound1],
            [sound2],
            [sound3]
        ]
        const [voices, setVoices] = useState(voice[0]);
        const [listenQ,setListenQ] = useState(quest[0]);

        // 문제리스트 가져오기
        const getListenList = async () => {
            const response = await getDailyListenTask(); 
            setTaskList(response.data);
            const url = await getMyDailyAudio(response.data[0].dailyTaskVO.audioUrl);
            setAudioBlob(url);
            setAnswer(response.data[0].dailyTaskVO.vietContent);
        }

        // 문제 바뀔 때마다 오디오 바꾸기
        const changeAudio = async () => {
            const url = await getMyDailyAudio(taskList[questionIndex].dailyTaskVO.audioUrl);
            setAudioBlob(url);
            setAnswer(taskList[questionIndex].dailyTaskVO.vietContent);
        }

        useEffect(() => {
            getListenList();
        }, [])

        useEffect(() => {
            if (taskList[questionIndex] && taskList[questionIndex].dailyTaskVO) {
                changeAudio();
            }


            if(questionIndex === 10) {
                alert("문제를 다 풀었습니다.")
                window.location.href = '/profile';
            }
        }, [questionIndex])


        // 오디오 재생 로직
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
        // ---------------------------------------

        // 답 선택 로직
        const chooseAnswer = (e) => {

            const chosenAnswer = e.target.innerText.substring(3);
            const isAnswer = chosenAnswer === answer;

            if(isAnswer) {
                alert("correct");
            } else {
                alert("wrong\n answer is " + answer);
            }

            postDailyListenTask(isAnswer, taskList[questionIndex].dailyTaskVO.solvedId);                

            setGauge(gauge+20);
            setQuestionIndex(questionIndex + 1);

            console.log(chosenAnswer);
            console.log(answer);
            const a = e.target.parentNode.childNodes;
            for(let i = 0; i < a.length; i++) {
                a[i].style.color = "white";
            }
            const b = e.target.style.color ="red";
        }

        // 다음 문제 로직
        const [gauge, setGauge] = useState(20);
        const gaugerHandle = (event) =>{
            // if(answer != undefined && answer != false && answer != null){
                if(true) {
                cnt++;
                setVoiceCnt(voiceCnt+1);
                setListenQ(quest[cnt])
                if(event.target.innerText === 'prev' && questionIndex > 0){
                    if(gauge > 0){
                        setGauge(gauge - 20)
                        setQuestionIndex(questionIndex - 1);
                    }
                }else if(event.target.innerText === 'next' && questionIndex < 4){
                        if(gauge < 100){
                            setGauge(gauge + 20)
                            setQuestionIndex(questionIndex + 1);
                        }
                }

                

                const b = document.getElementsByClassName("answer")[0].childNodes;
                for(let i = 0; i < b.length; i++) {
                    b[i].style.color = "white";
                }
                setAnswer(null);
            }else{
                alert("Các bạn hãy kiểm tra đáp án đi nào!")
            }
        }
        const audioPlay = () =>{
            console.log(voiceCnt)
            const audio = new Audio(voice[voiceCnt])
            audio.play();
        }

        const checkIfAnswer = (selectedViet) => {
            
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
                                        <li><div className='gauge' style={{width : gauge+"%" }}></div></li>
                                        <li><button onClick={gaugerHandle}>prev</button><button onClick={gaugerHandle}>next</button></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className='educationListen_bottom'>
                            <div className='ListenTest'>
                                    {taskList && taskList.length > 0 && questionIndex < 10 && (
                                        <div className='ListenQ'>
                                            <b>{taskList[questionIndex].dailyTaskVO.koreanContent}</b>
                                            <ul onClick={chooseAnswer} className='answer'>
                                                <li>1. {taskList[questionIndex].questionList[0]}</li>
                                                <li>2. {taskList[questionIndex].questionList[1]}</li>
                                                <li>3. {taskList[questionIndex].questionList[2]}</li>
                                                <li>4. {taskList[questionIndex].questionList[3]}</li>
                                                <li>5. {taskList[questionIndex].questionList[4]}</li>
                                            </ul>
                                        </div>
                                    )}
                                <div className='ListenV'>
                                    <button onClick={playBlob}>Questions Voice</button>
                                    <audio id="my-audio" ref={audioRef}>
                                    </audio>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default EducationV2;