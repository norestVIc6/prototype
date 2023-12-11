import React, { useCallback, useEffect, useState } from "react";
import '../css/profileadmins.css';
function Profileadmin( {setProfileModalOpen}) {
    const closeModal = () => {
        setProfileModalOpen(false);
      };
      const onClickHandler = (e) => {
            let i = 0;
            let silblingNode = e.currentTarget.parentNode.firstChild;
            while(1<e.currentTarget.parentNode.children.length){
                console.log(silblingNode.style.left)
                if(silblingNode.style.left ==="20%"){
                    silblingNode.style.left = e.currentTarget.style.left;
                    silblingNode.style.zIndex = e.currentTarget.style.zIndex;
                    e.currentTarget.style.left = "20%";
                    e.currentTarget.style.zIndex = "203";
                    break;
                }
                silblingNode = silblingNode.nextElementSibling;
                i++;
            }
        }

        const enterKeyHandler = (e) => {
            if(e.key === 'Enter') {
                e.currentTarget.value = '';
            }
        }


    return (
        <div className="box_wrapper">
        <div onClick={closeModal} className="blackModalv2">
        </div>
        <div className="profileAdminDetail" onClick={onClickHandler} style={{left : "20%",zIndex:"203"}}>
            <div className="pAD_top">
                <h3>사원 개인 정보</h3>
                <ul>
                    <li>사진</li>
                    <li>
                        <ul>
                            <li>이름 : </li>
                            <li>소속 : </li>
                            <li>시뮬레이션 결과 : </li>
                            <li>Level : </li>
                            <li>Accent : </li>
                            <li>Accuracy : </li>
                        </ul>
                    </li>                    
                </ul>
                <ul>
                    <li>
                        <button>
                            사원 수정
                        </button>
                        <button>
                            사원 삭제
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div className="progress_status" onClick={onClickHandler} style={{left : "35%",zIndex:"202"}}>
            <div className="progress_status_main">
            <   h3>교육 현황</h3>
                <ul>
                    <li>
                        <ul>
                            <li>10월 진도 현황</li>
                            <li><i></i></li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li>시뮬레이션 테스트 결과</li>
                            <li>테스트 결과 없음</li>
                        </ul>
                    </li>                    
                </ul>
            </div>
        </div>
        <div className="admin_comment" onClick={onClickHandler}  style={{left : "55%", zIndex:"201"}}>
            <div className="admin_comment_main">
                <h3>관리자 평가</h3>
                <ul>
                    <li>Comment</li>
                    <li>
                        <textarea onKeyDown={enterKeyHandler}></textarea>
                    </li>                    
                </ul>
            </div>
        </div>
    </div>
    );
}

export default Profileadmin;