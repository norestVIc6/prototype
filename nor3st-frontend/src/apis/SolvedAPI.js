import { serverIp } from "./IPconfig";

export function getMyDailyTasks() {
  return new Promise((resolve, reject) => {
    fetch(serverIp + '/solved/speaking', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('accessToken')
      }
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        reject(response.status);
      }
    }).then(json => {
      console.log(json);
      resolve(json);
    })
  });
}

export function getMyDailyAudio(audioUrl) {
  return new Promise((resolve, reject) => {

    fetch(`${serverIp}/solved/audio?audioUrl=${audioUrl}`, {
      method: 'GET',
      headers: {
        'Authorization': "Bearer " + localStorage.getItem('accessToken')
      }
    }).then(response => {
      if (response.status === 200) {

        return response.arrayBuffer();

      } else {
        reject(response.status);
      }
    }).then(json => {
      const blob = new Blob([json], { type: 'audio/mp3' });

      resolve(blob);
    })
  });
}

export function sendRecord(id, file, script) {
  return new Promise(async(resolve, reject) => {
    const formData = new FormData();
    formData.append('voice', file, `${id}.mp3`);
    formData.append('script', script)
    try {
      const response = await fetch(`http://localhost:3030/get_score`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        return data["score"]
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });
}

export function getDailyListenTask() {
  return new Promise((resolve, reject) => {
    fetch(`${serverIp}/solved/listening`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        reject(response.status);
      }
    }).then(json => {
      console.log(json);
      resolve(json);
    })
  })
}

export function postDailyListenTask(isAnswer, solvedId) {
  return new Promise((resolve, reject) => {
    fetch(`${serverIp}/solved/listening/${solvedId}?isAnswer=${isAnswer}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        reject(response.status);
      }
    }).then(json => {
      console.log(json);
      resolve(json);
    })
  })
}