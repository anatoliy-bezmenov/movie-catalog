import axios from 'axios';

const url = 'http://localhost:4000';

export const login = async (email, password) => {
  const body = {
    "email": email,
    "password": password
  };

  const headerObject = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const stringifiedBody = JSON.stringify(body);
  return new Promise((resolve, reject) => {
    axios.post(url + '/auth/login', stringifiedBody, { headers: headerObject })
      .then((response) => {
        resolve(response.data);
      })
      .catch((ex) => {
        reject(ex);
      })
  });
};

export const register = async (email, name, password, rePassword) => {
  const body = {
    "email": email,
    "name": name,
    "password": password,
    "rePassword": rePassword
  };

  const headerObject = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const stringifiedBody = JSON.stringify(body);
  return new Promise((resolve, reject) => {
    axios.post(url + '/auth/register', stringifiedBody, { headers: headerObject })
    .then((response) => {
      resolve(response.data);
    })
    .catch((ex) => {
      reject(ex);
    })
  })
};