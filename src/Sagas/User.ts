import axios from "axios";
import { put } from "redux-saga/effects";
import {
  setUserLoading,
  setUserData,
  setLastSuccessLogin,
} from "../Slices/User";
import { InitActionType, LoginResDataType } from "../CustomTypes";
import { setNetworkError } from "../Slices/General";
import { updateSession } from "../Utils/Helpers";

type AxiosLoginResponseType = {
  data: LoginResDataType
};

export function* loginUser(action: InitActionType) {
  const { url, data } = action;

  try {
    yield put(setUserLoading(true));
    const response: AxiosLoginResponseType = yield axios.post(url, data);
    const resData = response.data;
    const { accessToken, user  } = resData;
    const { fullname, ...restUserData } = user;

    yield updateSession(fullname, accessToken, JSON.stringify(restUserData));
    yield put(setUserData(restUserData));
    yield put(setUserLoading(false));
    yield put(setLastSuccessLogin(Date.now()));

  } catch (error) {
    yield put(setUserLoading(false));
    yield put(setNetworkError('User Login Failed. Check Credentials'));
    console.error(error);
  }
};
