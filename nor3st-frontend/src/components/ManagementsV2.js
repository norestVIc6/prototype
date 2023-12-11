import '../css/managementV2.css';
import { useState, useEffect } from 'react';
import { Link, Outlet,useLocation} from "react-router-dom";
function ManagementV2() {

    return (
        <div className='MembersContainer'>   
            <div className='MembersMain'>
                <div>
                    <div>
                        <h3>사원 목록</h3>
                    </div>
                    <div>
                    <select name="Category" id="category">
                        <option value="id">ID</option>
                        <option value="name">이름</option>
                        <option value="team">소속</option>
                        <option value="nickname">닉네임</option>
                    </select>
                    </div>
                    <div className='search'>
                        <input type='search' className=''/>
                        <button>검색</button>
                    </div>
                </div>
                <div className='MembersContents'>
                    <div className='MembersContents_head'>
                        <ul>
                            <li>ID</li>
                            <li>이름</li>
                            <li>소속</li>
                            <li>닉네임</li>
                            <li>주별 진행도</li>
                        </ul>
                    </div>
                    <div className='MembersContents_body'>
                        <Link to={'/admin/Members/Detail'}>
                        <ul>
                        
                            <li>ID</li>
                            <li>홍진영</li>
                            <li>AI</li>
                            <li>Jean</li>
                            <li>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </li>
                            
                        </ul>
                        </Link>
                        
                        <ul>                            
                            <li>ID</li>
                            <li>홍진영</li>
                            <li>AI</li>
                            <li>Jean</li>
                            <li>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>ID</li>
                            <li>홍진영</li>
                            <li>AI</li>
                            <li>Jean</li>
                            <li>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>ID</li>
                            <li>홍진영</li>
                            <li>AI</li>
                            <li>Jean</li>
                            <li>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>ID</li>
                            <li>홍진영</li>
                            <li>AI</li>
                            <li>Jean</li>
                            <li>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>ID</li>
                            <li>홍진영</li>
                            <li>AI</li>
                            <li>Jean</li>
                            <li>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>ID</li>
                            <li>홍진영</li>
                            <li>AI</li>
                            <li>Jean</li>
                            <li>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>ID</li>
                            <li>홍진영</li>
                            <li>AI</li>
                            <li>Jean</li>
                            <li>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>ID</li>
                            <li>홍진영</li>
                            <li>AI</li>
                            <li>Jean</li>
                            <li>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagementV2;