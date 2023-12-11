import '../css/managementDetailV2.css';
import { useState, useEffect } from 'react';
import { Link, Outlet,useLocation} from "react-router-dom";
function ManagementsDetailV2() {

    return (
        <div className='MembersDetailContainer'>   
            <div className='MembersDetailMain'>
                    <div className='MembersDetailMain_head'>
                        <h3>사원 정보</h3>
                        <Link to={'/admin/Members/modify'}><button >수정</button></Link>
                    </div>
                    <div className='MembersDetailMain_body'>
                        <ul>
                            <li>
                                <ul>
                                    <li></li>
                                    <li>Kantee. J</li>
                                    <li>A.I_agtteam</li>
                                    <li>Junior - 2년차</li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>
                                        <h4>10월 진도 현황</h4>
                                        <div className='month_progress'>
                                            <div className='checked'></div>
                                            <div className='nonchecked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                            <div className='checked'></div>
                                        </div>
                                    </li>
                                    <li>
                                        <h4>시뮬레이션 테스트 결과</h4>
                                        <p>테스트 결과 없음</p>
                                    </li>
                                    <li>
                                        <h4>Comment</h4>
                                        <p>This person is relatively got into our new prohect,
                                            so there must  be something he couldn’t catch 
                                            up with, though.....</p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

            </div>
        </div>
    );
}

export default ManagementsDetailV2;