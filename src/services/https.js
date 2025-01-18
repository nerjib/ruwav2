import axios from 'axios';
import { NotificationManager } from 'react-notifications';

export const baseUrl = 'http://localhost:5001/api/v1/ruwassa';




const CLIENT_TYPE = 'RUWASSA';
const CLIENT_ID = 'WATER';

export const httpPost = async (url, postBody, isNotAuth) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Oops!',
      3000
    );
  }
  try {
    const res = await axios.post(
      `${url}`,
      postBody,
      {
          headers: {
            'content-type': 'application/json',
            'CLIENT-TYPE': CLIENT_TYPE,
            'CLIENT-ID': CLIENT_ID,
            Authorization: `${localStorage.token}`
          },
        }
    );
    return res.data;
  } catch (error) {
    
    if (error?.response?.data.error === 'Internal Server Error') {
      return {
        status: false,
        message: error.response.data.error,
      };
    }
    if (error?.response?.data.message === 'Validation Errors') {
      Object.values(error.response.data.data).map((item) =>
        NotificationManager.error(item, 'Oops!', 5000)
      );
      return error.response?.data;
    }
    return error.response?.data;
  }
};

export const httpPostUnreloaded = async (
  url,
  postBody,
  otherUrl,
  isNotAuth
) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Oops!',
      3000
    );
  }
  try {
    const res = await axios.post(
      `${url}`,
      postBody,
      {}
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    
    return error.response?.data;
  }
};

export const httpPostFormData = async (url, postBody, otherUrl, isNotAuth) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Oops!',
      3000
    );
  }
  try {
    const res = await axios.post(
      `${url}`,
      postBody,
      {}
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    
    return error.response?.data;
  }
};

export const httpGet = async (url, otherUrl, isNotAuth) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Oops!',
      3000
    );
  }
  try {
    const res = await axios.get(
      url,
      {
          headers: {
            'CLIENT-TYPE': CLIENT_TYPE,
            'CLIENT-ID': CLIENT_ID,
          },
        }
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    
    if (error?.response?.data?.message === 'Validation Errors') {
      Object.values(error?.response?.data?.data).map((item) =>
        console.log('Oops!', item, 'error')
      );
      return error?.response?.data;;
    }
    return error?.response?.data;
  }
};

export const httpGetPdf = async (url, otherUrl, isNotAuth) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Oops!',
      3000
    );
  }
  try {
    const res = await axios.get(
      url,
      {}
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    
    if (error?.response?.data?.message === 'Validation Errors') {
      Object.values(error?.response?.data?.data).map((item) =>
        console.log('Oops!', item, 'error')
      );
      return error?.response?.data;;
    }
    return error?.response?.data;
  }
};

export const httpPut = async (url, postBody, otherUrl, isNotAuth) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Oops!',
      3000
    );
  }
  try {
    const res = await axios.put(
      `${url}`,
      postBody,
      {}
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    
    if (error.response.data.message === 'Validation Errors') {
      return {
        status: false,
        message: error.response?.data.data[0],
      };
    }
    return error.response?.data;
  }
};

export const httpPatch = async (url, postBody, otherUrl, isNotAuth) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Oops!',
      3000
    );
  }
  try {
    const res = await axios.patch(
      `${url}`,
      postBody,
      {}
    );
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const httpDelete = async (url, data, otherUrl, isNotAuth) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Oops!',
      3000
    );
  }
  try {
    const res = await axios.delete(
      `${url}`,
      {}
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    
    return error.response?.data;
  }
};
