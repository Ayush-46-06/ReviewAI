import axios from "axios";

const API = "/api/business";

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

  return axios.get(`/api/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
