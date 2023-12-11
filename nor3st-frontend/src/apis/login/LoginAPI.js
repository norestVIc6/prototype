import { serverIp } from '../IPconfig';

export const loginRequest = (loginInfo) => {
    const requestUrl = serverIp + '/members/login';

    return new Promise((resolve, reject) => {
        fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginInfo),
        }).then((response) => {
            if (response.status === 200) {
                resolve(response.json());
            } else {
                reject(response.json());
            }
        });
    });

}




export const loginCheck = () => {
    if(!localStorage.getItem('accessToken')) {
        alert('로그인 후 이용해주세요.');
        window.location.href = '/login';
    }
}