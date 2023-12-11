import '../css/managementsModify.css';
import { useState, useEffect } from 'react';

function ManagementsModify() {

    return (
        <div className='MembersModifyContainer'>   
            <div className='MembersModifyMain'>
                    <div className='MembersModifyMain_head'>
                        <h3>사원 정보 수정</h3>
                        <button>제출</button>
                    </div>
                    <div className='MembersModifyMain_body'>
                        <ul>
                            <li className='MembersModifyMain_body_info'>
                                <h3>사원 개인 정보</h3>
                                <ul>
                                    <li>
                                        <label>이름:</label><input type='text'/>
                                    </li>
                                    <li>
                                        <label>소속:</label><input type='text'/>
                                    </li>
                                    <li>
                                        <label>시뮬레이션 결과:</label><input type='text'/>
                                    </li>
                                    <li>
                                        <label>LEVEL:</label><input type='text'/>
                                    </li>
                                    <li>
                                        <label>이름:</label><input type='text'/>
                                    </li>
                                    <li>
                                        <label>소속:</label><input type='text'/>
                                    </li>
                                </ul>
                            </li>
                            <li className='MembersModifyMain_body_evaluation'>
                                <h3>관리자 평가</h3>
                                <div>
                                    <textarea>
                                    overall score he got from simulation test is greater 

                                    than other people in his team, especially, 

                                    comsidering the face that he started only a month

                                    ago, so I think that he has potential to improve the

                                    ..................................... 
                                    </textarea>
                                </div>
                            </li>
                        </ul>
                    </div>

            </div>
        </div>
    );
}

export default ManagementsModify;