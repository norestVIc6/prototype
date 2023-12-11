import '../css/education.css';
import {PieChart} from "react-minimal-pie-chart";
import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import React, { useState } from 'react';
import { useEffect } from 'react';
function Education() {
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
        const [similarity, setSimilarity] = useState(0);
        const playBlob = () => {
            if (audioBlob) {                
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                const audio = new Audio(url);
                audio.play();
            }
        };
        const waveformCanvas = document.getElementById('waveformCanvas');
        
        const handleFileSelect = (e) => {
            const file = e.target.files[0];        
            if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const audioBlob = new Blob([e.target.result], { type: 'audio/mp3' });
                console.log(audioBlob);
                setAudioBlob(audioBlob);
            };
            reader.readAsArrayBuffer(file);
            }

            console.log(audioBlob)
        };
        const handleFileSelecttest = (event) =>{
            const file = event.target.files[0];
      
            if (file) {
              const reader = new FileReader();
              reader.onload = function (e) {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const audioData = e.target.result;
                drawWaveform(audioData);
                // audioContext.decodeAudioData(audioData, function (buffer) {
                //   drawWaveform(buffer);
                // }, function (error) {
                //   console.error('Error decoding audio data:', error);
                // });
              };
      
            //   reader.readAsArrayBuffer(file);
            }
          }

        function drawWaveform(audioBuffer) {
            const channels = audioBuffer.numberOfChannels;
            const samples = audioBuffer.getChannelData(0); // Use data from the first channel
            const canvasContext = waveformCanvas.getContext('2d');
            canvasContext.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
      
            const waveformHeight = waveformCanvas.height / channels;
            const scaleFactor = waveformHeight / 2;
      
            for (let i = 0; i < samples.length; i++) {
              const x = (i / samples.length) * waveformCanvas.width;
              const y = (samples[i] * scaleFactor) + (waveformHeight / 2);
      
              canvasContext.beginPath();
              canvasContext.moveTo(x, waveformHeight);
              canvasContext.lineTo(x, y);
              canvasContext.stroke();
            }
          }
        useEffect(() => {
            setBlob(recordingBlob);
            compareBlobs();
            console.log(recordingBlob);
            if ( ! recordingBlob ) return ;
        },[ recordingBlob ])

        const saveRecording = () => {
            if (recordingBlob) {
                const audioBlob = new Blob([recordingBlob], { type: 'audio/wav' });                
                const downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(audioBlob);
                downloadLink.download = 'recorded_audio.wav';
                downloadLink.click();
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
        <div className='educontainer'>
            <div className='educontainer_top'>
                <div className='educontainer_t_left'>
                    <div className='ment'>안녕하세요, 좋은 아침입니다.</div>
                    <div className='edubtn'>
                        <ul>
                            {/* <li><input type="file" accept=".mp3" onChange={handleFileSelect} /></li> */}
                            <li><input type="file" accept=".blob" onChange={handleFileSelecttest} /></li>
                            <li onClick={saveRecording}>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                            <li>6</li>
                            <li>7</li>
                            <li>8</li>
                            <li>9</li>
                            <li>10</li>
                        </ul>
                    </div>
                </div>
                <div className='circlegraph'>
                    <PieChart data={[
                        {
                            value : similarity,
                            color : "#f48139",
                        },
                    ]}
                    reveal = { similarity } //퍼센트
                    lineWidth ={18}
                    background = "#f3f3f3"
                                        lengthAngle = {360}
                    rounded
                    animate
                    startAngle={270}
                    label={({ dataEntry }) => dataEntry.value + "%"}
                    labelStyle={{
                        fontSize : "1.1em",
                        fill : "#333333",
                    }}
                    labelPosition = {0}
                    />
                </div>
                <div className='educontainer_t_right'>
                    <ul>
                        {!isRecording ? <li onClick={startRecording}>RECORDING</li> : <li onClick={stopRecording}>STOP</li>}
                        <li onClick={playBlob}>REPEATING</li>
                        <li>SUBMITTING</li>
                    </ul>
                </div>
            </div>
            <div className='educontainer_bottom'>
                <div className='wavgraph'>
                <canvas id="waveformCanvas" width="800" height="200"></canvas>

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
    );
}

export default Education;