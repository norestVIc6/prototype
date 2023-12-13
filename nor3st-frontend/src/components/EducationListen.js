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
import lecture from '../json_data/question.json'

function EducationV2() {
    const usenavigate = useNavigate();
    const audioRef = useRef(null);
    const [ audioPath, setAudioPath] = useState("")
    const [ korean, setKorean ] = useState("")
    const [ viet, setViet ] = useState("")
    const [currentStep, setCurrentStep] = useState(0);
    const [gaugeUnit, setGaugeUnit] = useState(0)
    const [gradeUnit, setGradeUnit] = useState(0)
    const [currentGauge, setCurrentGauge] = useState(0)
    const [maxGauge, ] = useState(100)
    const [allQuestion, setAllQuestion] = useState([]);

    const [totalGrade, setTotalGrade ] = useState(0);

    const init = () => {
        const questions = getQuestions()
        const gaugeInit = Number(100 / questions.length);
        setGaugeUnit(gaugeInit);
        setGradeUnit(gaugeInit); //gauge 와 동일하게 증가해야함
        setCurrentGauge(gaugeInit);
    }

    useEffect(()=>{
        init()
    }, [])
    
    useEffect(()=> {
        const data = (currentStep) => {
            const questions = getQuestions();
            setAllQuestion([...questions])
            setAudioPath(questions[currentStep].file_path)
            setViet(questions[currentStep].viet)
            setKorean(questions[currentStep].speaking_sentence)
            console.log(audioPath)
        }
        data(currentStep);
        // return () => {
        //   const list = document.querySelectorAll(".answer_item");
        
        //     list.forEach((e) => {
        //       console.log("Turning white:", e);
        //       turnWhite({ target: e });
        //     });
        // };
    },[currentStep])

    // 문제 가져오기
    const getQuestions = () => {
        const questions = JSON.parse(JSON.stringify(lecture))
        return questions.questions
    }


    // 이전 버튼
    const prevButton = (e) => {
        if(currentGauge > 0){
            setCurrentGauge(currentGauge - gaugeUnit);
            setCurrentStep(currentStep - 1)
        }
    }

    // 다음 버튼
    const delay_next_button_refresh = (e) =>{
      setTimeout(() => {
          nextButton(e)
          turnWhite(e)
      }, 300); 
    }
    const nextButton = (e) => {
        if(currentGauge < maxGauge && currentStep < allQuestion.length - 1){
            setCurrentGauge(currentGauge + gaugeUnit);
            setCurrentStep(currentStep + 1)
        }else{
            window.location.href = "/profile"
        }
    }
    
    const shuffleAnswer = () => {
        let answers = allQuestion.map(e => e.viet);
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
          }
        return answers
    }

    //answer를 눌렀을 때 이벤트
    const selectAnswer = (e) =>{
        checkAnswer(e)
        delay_next_button_refresh(e)
    }
    // 정답 체크

    const checkAnswer = (e) =>{
      console.log("checked")
      const correct = e.target.innerHTML.includes(viet);
      if (correct) {
        setTotalGrade((prevTotalGrade) => prevTotalGrade + gradeUnit);
        turnBlue(e);
      } else {
        turnRed(e);
      }
    }

    const turnRed = (e) => {
        e.target.style.color = "red"
    }
    const turnWhite = (e) => {
        e.target.style.color = "white"
    }
    const turnBlue = (e)=>{
        e.target.style.color = "blue"
    }
    const playSound = () => {
        const audio = audioRef.current;
        if(audio){
            audio.play()
        }
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
                                        <li>{/*<button onClick={prevButton}>prev</button>*/}<button onClick={delay_next_button_refresh}>next</button></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className='educationListen_bottom'>
                            <div className='ListenTest'>
                                <div className='ListenQ'>
                                  <div className='ListenQuestionBox'>
                                    <div className='ListenKorean'>{korean}</div>
                                      <div className='ListenV'>
                                        <button onClick={playSound}>Questions Voice</button>
                                        <audio id="my-audio" ref={audioRef}>
                                          <source src={audioPath} type="audio/mp3" />
                                        </audio>
                                      </div>
                                  </div>
                                  <div className='ListenAnswerBox'>
                                    <ul className='answer'>
                                    {shuffleAnswer().map((el, idx) => (
                                        <li key={idx} className='answer_item' onClick={selectAnswer}>
                                          {idx+1}. {el}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default EducationV2;