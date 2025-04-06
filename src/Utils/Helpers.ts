import _startCase from 'lodash/startCase';
import moment from 'moment';
import { DEFAULT_BE, DEFAULT_DATE_TIME_FORMAT } from './Constants';
import axios from 'axios';
import { CommonObjType } from '../CustomTypes';

export const isUserLogged = () => !!sessionStorage.getItem('accessToken');

export const getAccessToken = () => sessionStorage.getItem('accessToken');

export const getFullName = () => sessionStorage.getItem('fullName') || '';

export const getRepairerData = () => {
  const data = sessionStorage.getItem('repairerData') || '';

  if (!data) {
    return {};
  }

  return JSON.parse(data);
};

export const updateSession = (
  fullName: string,
  accessToken: string,
  repairerData: string
) => {
  sessionStorage.setItem('fullName', fullName);
  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('repairerData', repairerData);
};

export const clearUserSession = () => {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('fullName');
  sessionStorage.removeItem('repairerData');
};

export const cellStartCase = (value: string) => _startCase(value);

export const cellAge = (value: string) => {
  const now = moment();
  const target = moment(value);

  if (!target.isValid()) {
    return 'N/A';
  }

  const dayDiff = now.diff(target, 'days');
  return `${dayDiff} Day${dayDiff > 1 ? 's': ''} Ago`;
};

export const toRealDate = (value: string, format?: string) => {
  const momentDate = moment(value);
  const convertTo = format || DEFAULT_DATE_TIME_FORMAT;

  if (!momentDate.isValid()) return 'N/A';

  return momentDate.format(convertTo);
}

export const getAxiosInstance = (auth = true, backend = DEFAULT_BE, headers: CommonObjType = {}) => {
  const baseURL = backend === DEFAULT_BE
    ? import.meta.env.VITE_SOLVUP_BACKEND_URL
    : import.meta.env.VITE_BACKEND_URL

  const instance = axios.create({
    baseURL,
    headers,
  });
  
  instance.interceptors.request.use(
    (config) => {
      if (auth) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response; 
    },
    (error) => {
      if (error.response?.status === 401) {
        clearUserSession();
        setTimeout(() => {
          window.location.href = '/?sessionExpired=true';
        })
      }
      return Promise.reject(error);
    }
  );

  return instance;
}