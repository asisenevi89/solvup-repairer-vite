import { put } from "redux-saga/effects";
import {
  AxiosAccountSummaryResType,
  AxiosPostcodeFetchResType,
  InitFetchAccountSummaryType,
  InitFetchPostCodesType,
  InitSavePostCodesType,
  InitUpdateAccountSummaryType,
  InitUpdateAvailabilityType,
  InitUpdateJobSettingType,
  InitUpdateLoginDetailsType,
  InitUpdatePickupType,
} from "../CustomTypes/ConfigurationTypes";
import {
  setAccountSummary,
  setAccountSummaryLoading,
  setAccountSummaryUpdateStatus,
  setAvailability,
  setAvailabilityUpdating,
  setJobSettings,
  setJobSettingUpdating,
  setLoginDetailsUpdateState,
  setPickupStatus,
  setPickupStatusUpdating,
  setPostcodeList,
  setPostcodeListLoading,
  setPostcodesSaving,
} from "../Slices/Configuration";
import { getAxiosInstance } from "../Utils/Helpers";
import { initFetchAccountSummary } from "../ActionCreators/Configurations";
import { setNetworkError, setSuccessSave } from "../Slices/General";
import { AxiosErrorResponse, AxiosGenericSuccessResData } from "../CustomTypes";

export function* fetchAccountSummary(action: InitFetchAccountSummaryType) {
  const { url } = action;

  try {
    yield put(setAccountSummaryLoading(true));
    const response: AxiosAccountSummaryResType = yield getAxiosInstance().get(url);
    const resData = response.data.data;
    yield put(setAccountSummary(resData));
    yield put(setAccountSummaryLoading(false));

  } catch (error) {
    yield put(setAccountSummaryLoading(false));
    console.error(error);
  }
};

export function* updateAccountSummary(action: InitUpdateAccountSummaryType) {
  const { url, data } = action;

  try {
    yield put(setAccountSummaryUpdateStatus(true));
    yield getAxiosInstance().put(url, data);
    yield put(setAccountSummaryUpdateStatus(false));

    // need to change this with backend message
    yield put(setSuccessSave('Contact details updated successfully'));

    // Update Name in the LocalStorage
    yield sessionStorage.setItem('fullName', data.name);

    // Might be able remove this
    yield put(initFetchAccountSummary());

  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    yield put(setAccountSummaryUpdateStatus(false));
    yield put(setNetworkError(axiosError.response.data.StatusDescription));
    console.error(error);
  }
};

export function* updateLoginDetails(action: InitUpdateLoginDetailsType) {
  const { url, data } = action

  try {
    yield put(setLoginDetailsUpdateState(true));
    yield getAxiosInstance().put(url, data);
    yield put(setLoginDetailsUpdateState(false));

    // need to change this with backend message
    yield put(setSuccessSave('Password updated successfully'));
  
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    yield put(setLoginDetailsUpdateState(false));
    yield put(setNetworkError(axiosError.response.data.message));
    console.error(error);
  }
};

export function* updateNationwidePickup(action: InitUpdatePickupType) {
  const { url, value } = action

  try {
    yield put(setPickupStatusUpdating(true));
    const response: AxiosGenericSuccessResData = yield getAxiosInstance().put(url);
    yield put(setPickupStatus(value));
    yield put(setPickupStatusUpdating(false));
    yield put(setSuccessSave(response.data.message));
  
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    yield put(setPickupStatusUpdating(false));
    yield put(setNetworkError(axiosError.response.data.message));
    console.error(error);
  }
};

export function* fetchPostcodeList(action: InitFetchPostCodesType) {
  const { url } = action

  try {
    yield put(setPostcodeListLoading(true));
    const response: AxiosPostcodeFetchResType = yield getAxiosInstance().get(url);
    yield put(setPostcodeList(response.data.data));
    yield put(setPostcodeListLoading(false));  
  } catch (error) {
    yield put(setPostcodeListLoading(false));
    console.error(error);
  }
};

export function* savePostcodes(action: InitSavePostCodesType) {
  const { url, data, successCallback } = action;

  const saveData = { postcodes: data };

  try {
    yield put(setPostcodesSaving(true));
    const response: AxiosGenericSuccessResData = yield getAxiosInstance().post(url, saveData);
    yield put(setPostcodesSaving(false));
    yield put(setSuccessSave(response.data.message));
    yield put(successCallback);
  
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    yield put(setPostcodesSaving(false));
    yield put(setNetworkError(axiosError.response.data.message));
    console.error(error);
  }
};

export function* updateJobSettings(action: InitUpdateJobSettingType) {
  const { url, data } = action

  try {
    yield put(setJobSettingUpdating(true));
    const response: AxiosGenericSuccessResData = yield getAxiosInstance().put(url, data);
    yield put(setJobSettingUpdating(false));
    yield put(setJobSettings(data));
    yield put(setSuccessSave(response.data.data));
  
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    yield put(setJobSettingUpdating(false));
    yield put(setNetworkError(axiosError.response.data.message));
    console.error(error);
  }
};

export function* updateRepairerAvailability(action: InitUpdateAvailabilityType) {
  const { url, value } = action

  try {
    yield put(setAvailabilityUpdating(true));
    const response: AxiosGenericSuccessResData = yield getAxiosInstance().put(url);
    yield put(setAvailability(value));
    yield put(setAvailabilityUpdating(false));
    yield put(setSuccessSave(response.data.message));
  
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    yield put(setAvailabilityUpdating(false));
    yield put(setNetworkError(axiosError.response.data.message));
    console.error(error);
  }
};
