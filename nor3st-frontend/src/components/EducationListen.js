import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import lecture from '../json_data/question.json';

function EducationV2() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [audioPath, setAudioPath] = useState('');
  const [korean, setKorean] = useState('');
  const [viet, setViet] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [gaugeUnit, setGaugeUnit] = useState(0);
  const [currentGauge, setCurrentGauge] = useState(0);
  const [maxGauge] = useState(100);
  const [allQuestion, setAllQuestion] = useState([]);
  const [totalGrade, setTotalGrade] = useState(0);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const questions = await getQuestions();
      setAllQuestion(questions);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const data = () => {
      setAudioPath(allQuestion[currentStep]?.file_path || '');
      setViet(allQuestion[currentStep]?.viet || '');
      setKorean(allQuestion[currentStep]?.speaking_sentence || '');
    };
    data();
  }, [currentStep, allQuestion]);

  const init = () => {
    let gaugeInit = 100 % allQuestion.length;
    setGaugeUnit(gaugeInit);
    setCurrentGauge(gaugeInit);
  };

  const getQuestions = async () => {
    try {
      const response = await fetch('API_ENDPOINT_TO_GET_QUESTIONS');
      const data = await response.json();
      return data.questions;
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  };

  const prevButton = () => {
    if (currentGauge > 0) {
      setCurrentGauge(currentGauge - gaugeUnit);
      setCurrentStep(currentStep - 1);
    }
  };

  const nextButton = () => {
    if (currentGauge < maxGauge) {
      setCurrentGauge(currentGauge + gaugeUnit);
      setCurrentStep(currentStep + 1);
    } else if (currentGauge >= maxGauge) {
      navigate('/profile');
    }
  };

  const checkAnswer = (e) => {
    const correct = e.target.innerHTML === viet;
    if (correct) {
      setTotalGrade((prevGrade) => prevGrade + 1);
    }
  };

  const shuffleAnswer = () => {
    let answers = allQuestion.map((e) => e.viet);
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  };

  const turnRed = (e) => {
    e.target.style.color = 'red';
  };

  const playSound = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
    }
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
                                        <li><div className='gauge' style={{width : currentGauge+"%" }}></div></li>
                                        <li>{/*<button onClick={prevButton}>prev</button>*/}<button onClick={nextButton}>next</button></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className='educationListen_bottom'>
                            <div className='ListenTest'>
                                <div className='ListenQ'>
                                    <b>{korean}</b>
                                    <ul onClick={checkAnswer} className='answer'>
                                        {shuffleAnswer().map((el, idx) => (
                                            <li key={idx} onClick={turnRed}>
                                            {idx}. {el}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='ListenV'>
                                    <button onClick={playSound}>Questions Voice</button>
                                    <audio id='my-audio' ref={audioRef}>
                                    <source src={`/${audioPath}`} />
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