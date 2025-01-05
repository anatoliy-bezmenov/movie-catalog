import axios from 'axios';

const url = 'http://localhost:4000';

export const getMovies = async () => {
    const headerObject = {
        Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: null,
    };
    const response = await axios.get(url + '/movies', {headers: headerObject});
    return new Promise((resolve, reject) => {
        resolve(response.data);
    })
};

export const getMovieById = async (id) => {
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    const response = await axios.get(url + `/movies/${id}/details`, {headers: headerObject});
    return new Promise((resolve, reject) => {
        resolve(response.data);
    })
};

export const deleteMovieById = async (id, token) =>{
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
    };
    console.log("header object ", headerObject);

    const response = await axios.get(url + `/movies/${id}/delete`, { headers: headerObject });
    return new Promise((resolve, reject) => {
        resolve(response.data);
    })
};

export const createMovie = async (movieData, token) => {
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
    };

    console.log("service ", movieData, token);
    const response = await axios.post(url + '/movies/create', movieData,
    { headers: headerObject });
    return new Promise((resolve, reject) => {
        resolve(response.data);
    })
    .catch((ex) => {
        console.log('456 createMovie', ex.message);
      })
};

export const saveMovieById = async (id, movieData, token) => {
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
    };

    id = '6777f1fdc035afe20afd3d71';

    console.log('service ', id, movieData, token);
    const response = await axios.post(url + `/movies/${id}/update`, movieData,
    { header: headerObject });
    return new Promise((resolve, reject) => {
        resolve(response.data);
    })
    .catch((ex) => {
        console.log('456 saveMovieById ', ex.message);
    })
};

