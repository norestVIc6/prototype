import axios from 'axios';
import { serverIp } from './IPconfig';

export async function UploadImage(files) {
    const url = serverIp + "/uploadImage";
    try {
        await axios.post(url, files, {
            headers: {'Content-type': 'application/json'},
        });
    } catch (error) {
        console.error(error);
        alert("이미지 업로드에 실패했습니다.")
    }
}

export function CheckAvater() {
    return new Promise((resolve, reject) => {
        const result = fetch(serverIp + "/checkAvatar", {
            method: "GET",
        }).then(res => {res.json()})
        .catch(error => console.log(error));

        resolve(result);
    });
}