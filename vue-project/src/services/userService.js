import axios from 'axios';

const url = 'http://localhost:4000';

export const login = async (email, password) => {
  const body = {
    "email": email,
    "password": password
  };

  console.log("email and password ", email, password);

  const stringifiedBody = JSON.stringify(body);
  // const response = axios.post(url + '/auth/login', stringifiedBody,
  //   { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } });
  console.log('stringBody ', stringifiedBody);
  return new Promise((resolve, reject) => {
    axios.post(url + '/auth/login', stringifiedBody,
      { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log('1234 ', response);
        resolve(response.data);
      })
      .catch((ex) => {
        console.log('567 ', ex.message);
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
  console.log("register information ", email, name, password, rePassword);
  const stringifiedBody = JSON.stringify(body);

  return new Promise((resolve, reject) => {
    axios.post(url + '/auth/register', stringifiedBody,
    { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } })
    .then((response) => {
      console.log('123 register ', response);
      resolve(response.data);
    })
    .catch((ex) => {
      console.log('456 register', ex.message);
    })
  })
};

export const getUsers = () => {
  const result = axios.get(url + ``)
}