export default class AuthService {
    TOKEN_KEY = '[token]';
    USER_KEY = '[user]';

    getUser() {
        return localStorage[this.USER_KEY]
    }

    getToken() {
        return localStorage[this.TOKEN_KEY]
    }

    setDataToStorage(data) {
      localStorage.setItem(this.TOKEN_KEY, data.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(data));
      return;
    };

    removeToken() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        return;
    }
};

const TOKEN_KEY = '[token]';
const USER_KEY = '[user]';

export const setDataToStorage = (data) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data));
    return;
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return;
};

export const getUser = () => {
    return localStorage[USER_KEY];
};

export const getToken = () => {
    return localStorage[TOKEN_KEY];
};

export const isLoggedIn = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && token.length > 0) {
        return true;
    }
    return false;
};
