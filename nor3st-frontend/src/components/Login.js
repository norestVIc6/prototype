import "../css/login.css";
import { loginRequest } from '../apis/login/LoginAPI';
import {Link} from 'react-router-dom'
import { useRef } from "react";

function Login() {

    const usernameRef = useRef();
    const passwordRef = useRef();

    const loginHandler = async () => {

         const loginInfo = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        if(loginInfo.username === '') return alert('아이디를 입력해주세요.');
        if(loginInfo.password === '') return alert('비밀번호를 입력해주세요.');

        try {
            const response = await loginRequest(loginInfo);

            alert('로그인 성공');

            console.log(response);

            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('grantType', response.data.grantType);
            localStorage.setItem('role', response.data.memberRole);

            if(response.data.memberRole === 'EMPLOYEE') {
                window.location.href = '/profile';
            } else {
                window.location.href = '/admin/dashboard';
            }

            


        } catch (error) {
            alert('로그인 정보를 확인해주세요.');
            passwordRef.current.value = '';
        }

        
    }

    const enterHandler = (e) => {
        if(e.key === 'Enter') {
            loginHandler();
        }
    }
        

    return (
        <div className="loginMain">
            <div className="logindep1">
                <ul>
                    <li><Link to={"/"}>SSAL</Link></li>
                    <li><input type="text" placeholder="username" ref={usernameRef} onKeyDown={enterHandler}/></li>
                    <li><input type="password" placeholder="password" ref={passwordRef} onKeyDown={enterHandler}/></li>
                    <li><input type="submit" value="Log in" onClick={loginHandler}/></li>
                </ul>
            </div>
        </div>
    );
}

export default Login;