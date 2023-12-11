import { serverIp } from './IPconfig';

export function requestMemberInfo() {
    return new Promise((resolve, reject) => {
       fetch(serverIp + "/members", {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
              },
         }).then((response) => {
              if (response.status === 200) {
                resolve(response.json());
              } else {
                reject(response.json());
              }
         })
         .catch((error) => {
              reject(error);
         });
    });
}

export function registerMultipleEmployee(registerCount) {
  return new Promise((resolve, reject) => {
    fetch(serverIp + '/members/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: {
        "registerCount": registerCount
      }
    }).then(response => {
      if (response.status === 200) {
        resolve(response.json());
      } else {
        reject(response.json());
      }
    }).catch(error => {
      reject(error);
    });
  }); 
} 

export function updateEmployee(username, password, department) {
  console.log(username, password, department);
  return new Promise((resolve, reject) => {
    fetch(serverIp + '/members/employee', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
        "department": department
      })
    }).then(response => {
      if (response.status === 200) {
        resolve(response.json());
      } else {
        reject(response.json());
      }
    }).catch(error => {
      reject(error);
    });
  })
}

export function getEmpListDash() {
  return new Promise((resolve, reject) => {
    fetch(serverIp + '/members/empListDash', {
      method: 'GET',
    }).then(response => {
      if (response.status === 200) {
        resolve(response.json());
      } else {
        reject(response.json());
      }
    })
  })
}

export function updateManagerComment(memberId, managerComment) {

}