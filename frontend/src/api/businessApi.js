import axios from "axios";

const API = "http://localhost:5000/api/business";

export const createBusiness = (data, token) => {

  return axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

};

export const getUserBusinesses = (token) => {

  return axios.get(`${API}/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

};

export const getUserprofile = (token) => {

  return axios.get(`http://localhost:5000/api/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
