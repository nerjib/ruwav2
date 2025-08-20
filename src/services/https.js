import { NotificationManager } from 'react-notifications';
import api from './api';

const CLIENT_TYPE = 'RUWASSA';
const CLIENT_ID = 'WATER';

export const httpPost = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Oops!',
      3000
    );
  }
  try {
    const res = await api.post(url, postBody, {
      headers: {
        'CLIENT-TYPE': CLIENT_TYPE,
        'CLIENT-ID': CLIENT_ID,
      },
    });
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

export const httpGet = async (url) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Oops!',
      3000
    );
  }
  try {
    const res = await api.get(url, {
      headers: {
        'CLIENT-TYPE': CLIENT_TYPE,
        'CLIENT-ID': CLIENT_ID,
      },
    });
    return res.data;
  } catch (error) {
    if (error?.response?.data?.message === 'Validation Errors') {
      Object.values(error?.response?.data?.data).map((item) =>
        console.log('Oops!', item, 'error')
      );
      return error?.response?.data;
    }
    return error?.response?.data;
  }
};

export const httpPut = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Oops!',
      3000
    );
  }
  try {
    const res = await api.put(url, postBody, {});
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

export const httpPatch = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Oops!',
      3000
    );
  }
  try {
    const res = await api.patch(url, postBody, {});
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const httpDelete = async (url, data) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Oops!',
      3000
    );
  }
  try {
    const res = await api.delete(url, {});
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

