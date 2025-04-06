import { AxiosError } from "axios";
import { put } from "redux-saga/effects";
import {
  setJobsLoading,
  setJobs,
  setJobStatusesLoading,
  setJobStatusList,
  setBookmarkedStatusesLoading,
  setBookmarkedStatusList,
  updateBookmarkStatuesAfterDelete,
  setBookmarkSaving,
  setLastBookmarkSave,
  setAnnouncementListLoading,
  setAnnouncementList,
} from "../Slices/CaseList";

import { setNetworkError, setSuccessSave } from "../Slices/General";
import {
  InitActionType,
  JobResponseDataType,
  JobStatusListResType,
  BookmarkedStatusListResType,
  InitBookmarkDeleteType,
  AnnouncementsListResType,
  AxiosGenericSuccessResData,
  AxiosErrorResponse,
} from "../CustomTypes";
import { getAxiosInstance } from "../Utils/Helpers";

export type AxiosJobListResponseType = {
  data: {
    data : JobResponseDataType,
  }
};

type AxiosJobStatusResponseType = {
  data: JobStatusListResType,
};

type AxiosBookmarkedStatusResType = {
  data: BookmarkedStatusListResType,
}

type AxiosAnnouncementListResType = {
  data: AnnouncementsListResType,
}

type AxiosSuccessResponse = {
  data: AxiosGenericSuccessResData
}

export function* fetchCases(action: InitActionType) {
  const { url } = action;

  try {
    yield put(setJobsLoading(true));
    const response: AxiosJobListResponseType = yield getAxiosInstance().get(url);
    
    const resData = response.data.data;
    yield put(setJobs(resData));
    yield put(setJobsLoading(false));

  } catch (error) {
    yield put(setJobsLoading(false));
    console.error(error);
  }
};

export function* fetchCaseStatuses(action: InitActionType) {
  const { url } = action;

  try {
    yield put(setJobStatusesLoading(true));
    const response: AxiosJobStatusResponseType = yield getAxiosInstance().get(url);
    const resData = response.data.data;
    yield put(setJobStatusList(resData));
    yield put(setJobStatusesLoading(false));

  } catch (error) {
    yield put(setJobStatusesLoading(false));
    console.error(error);
  }
};

export function* fetchBookmarkedStatuses(action: InitActionType) {
  const { url } = action;

  try {
    yield put(setBookmarkedStatusesLoading(true));
    const response: AxiosBookmarkedStatusResType = yield getAxiosInstance().get(url);
    const resData = response.data.data;
    yield put(setBookmarkedStatusList(resData));
    yield put(setBookmarkedStatusesLoading(false));

  } catch (error) {
    yield put(setBookmarkedStatusesLoading(false));
    console.error(error);
  }
};

export function* deleteBookmarkedStatus(action: InitBookmarkDeleteType) {
  const { url, id } = action;

  try {
    yield put(setBookmarkedStatusesLoading(true));
    const response: AxiosSuccessResponse = yield getAxiosInstance().delete(url);
    const message = response.data.StatusDescription
    yield put(updateBookmarkStatuesAfterDelete(id));
    yield put(setBookmarkedStatusesLoading(false));
    yield put(setSuccessSave(message));

  } catch (error) {
    const axiosError = error as AxiosError
    yield put(setBookmarkedStatusesLoading(false));
    yield put(setNetworkError(axiosError.message));
    console.error(error);
  }
};

export function* saveBookmarkList(action: InitActionType) {
  const { url, data } = action;
  const saveData = {
    statusCode: data,
  };

  try {
    yield put(setBookmarkSaving(true));
    const response: AxiosSuccessResponse = yield getAxiosInstance().post(url, saveData);
    const message = response.data.StatusDescription
    yield put(setBookmarkSaving(false));
    yield put(setLastBookmarkSave(Date.now()));
    yield put(setSuccessSave(message));
  } catch (error) {
    const axiosError = error as AxiosErrorResponse
    yield put(setBookmarkSaving(false));
    yield put(setNetworkError(axiosError.response.data.StatusDescription));
    console.error(error);
  }
};

export function* fetchAnnouncements(action: InitActionType) {
  const { url } = action;

  try {
    yield put(setAnnouncementListLoading(true));
    const response: AxiosAnnouncementListResType = yield getAxiosInstance().get(url);
    const resData = response.data.data;
    yield put(setAnnouncementList(resData));
    yield put(setAnnouncementListLoading(false));

  } catch (error) {
    yield put(setAnnouncementListLoading(false));
    console.error(error);
  }
}
