import cookie from "js-cookie";
import { decodeToken } from "react-jwt";

export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key);
  }
};

export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const authenticate = (response, next) => {
  // console.log(response)
  console.log(response)
  setCookie("token", response.data.token);
  setLocalStorage("user", decodeToken(response.data.token).user);
  console.log(decodeToken(response.data.token).user);
  // console.log('signed in')
  next();
};

export const signout = (next) => {
  removeCookie("token");
  // console.log('signed out')
  removeLocalStorage("user");
};

export const isAuth = () => {
  if (window !== "undefined") {
    // console.log(decodeToken(getCookie('token')).user)
    const cookieChecked = getCookie("token");
    // return true
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        // return decodeToken(getCookie('token')).user
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const updateUser = (response, next) => {
  if (window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};
