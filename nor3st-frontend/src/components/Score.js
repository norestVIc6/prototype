import "../css/score.css";
import {Link} from 'react-router-dom'
import { useState } from "react";
function Score() {
    return (
        <div className="scorecontainer">
            <div className="scorebg">            
            </div>
            <div className="scoremain">
                <div>
                    <div>
                        <h3>LMM Team_ Jisoo</h3>
                        <h4>Junior_AI C team</h4>
                    </div>
                    <ul>
                        <li>SPEAKING</li>
                        <li>LISTENING</li>
                        <li>SIMULATION</li>
                    </ul>
                </div>
                <div>
                    <div className="scoreboard">
                        <div>
                            <ul>
                                <li>Speaking_words</li>
                                <li>Status</li>
                                <li>Speaking_sents</li>
                                <li>Status</li>
                            </ul>
                        </div>
                        <div>
                            <div>
                                <ul>
                                    <li>Chapter 1</li>
                                    <li>Chapter 2</li>
                                    <li>Chapter 3</li>
                                    <li>Chapter 4</li>
                                    <li>Chapter 5</li>
                                </ul>
                                <ul>
                                    <li>Complete</li>
                                    <li>Complete</li>
                                    <li>Complete</li>
                                    <li>Complete</li>
                                    <li>In progress</li>
                                </ul>
                                <ul>
                                    <li>Chapter 1</li>
                                    <li>Chapter 2</li>
                                    <li>Chapter 3</li>
                                    <li>Chapter 4</li>
                                    <li>Chapter 5</li>
                                </ul>
                                <ul>
                                    <li>Complete</li>
                                    <li>Complete</li>
                                    <li>Complete</li>
                                    <li>Complete</li>
                                    <li>In progress</li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>                    
                </div>
            </div>
            <div className="scorebar">

            </div>
        </div>
    );
}

export default Score;