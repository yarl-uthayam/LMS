import { message } from 'antd';
import axios from 'axios';
import { ACCESS_TOKEN, API_URL } from '../utils/config';

function addParamsToURL(url, params) {
  let tempUrl = API_URL + url;
  if (params) {
    tempUrl = tempUrl + '/' + params;
    return tempUrl;
  }
  return tempUrl;
}

const getHeaders = (token) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return token != null
    ? {
        headers: {
          ...headers,
          'x-access-token': `${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      }
    : { headers };
};

export const api = (method, endpoint, token, body, params) => {
  switch (method) {
    case 'GET':
      // HTTP GET Request - Returns Resolved or Rejected Promise
      return new Promise((resolve, reject) => {
        const URL = addParamsToURL(`${endpoint}`, params);
        axios
          .get(URL, getHeaders(token))
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            console.log(error.response);
            if (error?.response?.status == 401) {
            }
            reject(error);
          });
      });
    case 'POST':
      // HTTP POST Request - Returns Resolved or Rejected Promise
      return new Promise((resolve, reject) => {
        const URL = addParamsToURL(`${endpoint}`, params);
        axios
          .post(URL, body, getHeaders(token))
          .then((response) => {
            response?.data?.message && message.success(response.data.message);
            resolve(response);
          })
          .catch((error) => {
            console.log(error.response);
            reject(error.response);
          });
      });
    case 'DELETE':
      // HTTP DELETE Request - Returns Resolved or Rejected Promise
      return new Promise((resolve, reject) => {
        const URL = addParamsToURL(`${endpoint}`, params);
        axios
          .delete(URL, getHeaders(token))
          .then((response) => {
            response?.data?.message && message.success(response.data.message);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    case 'PUT':
      return new Promise((resolve, reject) => {
        const URL = addParamsToURL(`${endpoint}`, params);
        axios
          .put(URL, body, getHeaders(token))
          .then((response) => {
            response?.data?.message && message.success(response.data.message);
            resolve(response);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });

    default:
      return null;
  }
};
