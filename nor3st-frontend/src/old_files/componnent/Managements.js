import '../css/management.css';
import Profileadmin from '../../components/Profileadmins';
import { useState, useEffect } from 'react';
import { getEmpListDash } from '../../apis/MemberAPI';
function Management() {
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [empList, setEmpList] = useState([]);


    const showModal = () => {
        setProfileModalOpen(true);
    }

    useEffect(() => {
        getEmpList();
    }, []);

    const getEmpList = async () => {
        const response = await getEmpListDash();
        console.log(response.data);
        setEmpList(response.data);
    }

    return (
        <>
        <div className='Managercontainer'>
            <div className='search'>
                <input type='search' className=''/>
                <button>검색</button>
            </div>
            <div className='team'>
                <ul>
                    <li>TEAM A</li>
                    <li>TEAM B</li>
                    <li>TEAM C</li>
                    <li>TEAM D</li>
                </ul>
            </div>
            <div className='detail'>
                {empList.map((emp) => (
                    <div key={emp.memberId} onClick={showModal}>
                        <ul>
                            <li>
                                <p>사진</p>
                            </li>
                            <li>
                                <ul>
                                    <li>사원 아이디 : {emp.username}</li>
                                    <li>부서 : {emp.department}</li>
                                    {emp.managerComment ? (
                                            <li>관리자 댓글 : {emp.managerComment}</li>
                                        ) : (
                                            <li>관리자 댓글 : 없음</li>
                                        ) 
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                    )
                )}
            </div>
            <div className='page'>
                1 / 3
            </div>
        </div>
        {profileModalOpen && <Profileadmin setProfileModalOpen={setProfileModalOpen}/> }
        </>
    );
}

export default Management;