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
    .catch((ex) => {
        reject(ex);
      })
};

export const getMovieByIdNoUser = async (id) => {
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    const response = await axios.get(url + `/movies/${id}/details`, {headers: headerObject});
    return new Promise((resolve, reject) => {
        resolve(response.data);
    })
    .catch((ex) => {
        reject(ex);
      })
};

export const getMovieById = async (id, token) => {
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
    };

    const response = await axios.get(url + `/movies/${id}/details`, 
    { headers: headerObject });
    return new Promise((resolve, reject) => {
        resolve(response.data);
    })
    .catch((ex) => {
        reject(ex);
      })
};

export const deleteMovieById = async (id, token) =>{
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
    };

    const response = await axios.get(url + `/movies/${id}/delete`, { headers: headerObject });
    return new Promise((resolve, reject) => {
        resolve(response.data);
    })
    .catch((ex) => {
        reject(ex);
      })
};

export const createMovie = async (movieData, token) => {
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
    };

    const response = await axios.post(url + '/movies/create', movieData,
    { headers: headerObject });
    return new Promise((resolve, reject) => {
        resolve(response.data);
    })
    .catch((ex) => {
        reject(ex);
      })
};

export const saveMovieById = async (id, movieData, token) => {
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
    };

    const response = await axios.post(url + `/movies/${id}/update`, movieData,
    { headers: headerObject });
    return new Promise((resolve, reject) => {
        resolve(response.data);
    })
    .catch((ex) => {
        reject(ex);
    })
};

export const searchMovie = async (name) => {
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    const response = await axios.get(url + `/movies/search`, 
    { headers: headerObject, params: {q: name} } )
    return new Promise((resolve, reject) => {
        resolve(response.data)
    })
};