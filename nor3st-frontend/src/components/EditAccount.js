import React, { useCallback, useEffect, useRef, useState } from "react";
import { UploadImage } from '../apis/UploadAPI';
import { updateEmployee } from '../apis/MemberAPI';
import '../css/editAccount.css';
function EditAccount( {setProfileModalOpen, username, department}) {

    const usernameRef = useRef();
    const passwordRef = useRef();
    const departmentRef = useRef();


    useEffect(() => {
        usernameRef.current.value = username;
        departmentRef.current.value = department;
    }, []);

    const closeModal = () => {
        setProfileModalOpen(false);
    };
    
    const enterKeyHandler = (e) => {
        if(e.key === 'Enter') {
            if(passwordRef.current.value === '') {
                alert('비밀번호를 입력해주세요.');
                return;
            }

            editEmployeeInfo();
            
            

        }
    } 

    const editEmployeeInfo = async () => {
        const response = await updateEmployee(usernameRef.current.value, passwordRef.current.value, departmentRef.current.value);
        window.location.reload();
        console.log(response);
    }

    return (
        <>
        <div onClick={closeModal} className="blackModalv2">
        </div>
        <div className="editprofile">
            <div className="editprofileheader">
                <ul>
                    <li>Edit Account</li>
                </ul>
            </div>
            <div className="editprofilebody">
                <div>
                    <div className="editprofilebody_left">
                        <div>
                            <ul>
                                <li>이미지</li>
                                <li><input type="button" value="Image upload" /></li>
                            </ul>
                        </div>
                    </div>
                    <div className="editprofilebody_right">
                        <ul>
                            <li><input type="text" placeholder="ID" ref={usernameRef} onKeyDown={enterKeyHandler}/></li>
                            <li><input type="password" placeholder="PW" ref={passwordRef} onKeyDown={enterKeyHandler} /></li>
                            <li><input type="text" placeholder="TEAM" ref={departmentRef} onKeyDown={enterKeyHandler} /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default EditAccount;