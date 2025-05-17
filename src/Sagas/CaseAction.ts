import axios from "axios";
import { put } from "redux-saga/effects";
import {
  setSelectedJobLoading,
  setSelectedJob,
  setRequestNotesLoading,
  setRequestNotes,
  setActionItemsLoading,
  setJobActionItem,
  setJobActionItems,
  setCaseTabDataLoading,
  setCaseTabData,
  setCaseEscalationStatus,
  setNoteSavingStatus,
  setAttachmentDownloading,
} from '../Slices/CaseAction';
import { setNetworkError, setSuccessSave } from "../Slices/General";
import { getAccessToken, getAxiosInstance } from "../Utils/Helpers";
import {
  InitActionType,
  InitJobActionSaveType,
  ReqNoteResType,
  JobActionItemsResType,
  CaseDetailTabResDataType,
  CaseDetailTabSagaType,
  InitCaseEscalate,
  AxiosGenericSuccessResData,
  AxiosErrorResponse,
  InitAddNote,
  DownloadResType,
  InitFileDownloadType,
} from "../CustomTypes";
import { AxiosJobListResponseType } from "./CaseList";
import { initFetchCaseRequestNotes } from "../ActionCreators/CaseAction";

type AxiosJobReqNotesType = {
  data: ReqNoteResType,
}

type AxiosJobActionItemsType = {
  data: JobActionItemsResType
}

type AxiosCaseDetailsTabDataType = {
  data: CaseDetailTabResDataType
}

type AxiosDownloadAttachmentType = {
  data: DownloadResType
}

export function* fetchCaseById(action: InitActionType) {
  const { url } = action;

  try {
    yield put(setSelectedJobLoading(true));
    const response: AxiosJobListResponseType = yield getAxiosInstance().get(url);
    const resData = response.data.data.records[0];
    yield put(setSelectedJob(resData));
    yield put(setSelectedJobLoading(false));

  } catch (error) {
    yield put(setSelectedJobLoading(false));
    console.error(error);
  }
};

export function* fetchCaseRequestNotes(action: InitActionType) {
  const { url } = action;

  try {
    yield put(setRequestNotesLoading(true));
    const response: AxiosJobReqNotesType = yield getAxiosInstance().get(url);
    const resData = response.data.data;
    yield put(setRequestNotes(resData));
    yield put(setRequestNotesLoading(false));

  } catch (error) {
    yield put(setRequestNotesLoading(false));
    console.error(error);
  }
};

export function* saveCaseActionItem (action: InitJobActionSaveType) {
  const { url, data } = action;

  try {
    yield put(setActionItemsLoading(true));
    yield axios.post(url, data);
    yield put(setJobActionItem({
      itemKey: data.itemKey,
      data: data.actionData,
    }));
    yield put(setActionItemsLoading(false));
    yield put(setSuccessSave('Successfully Saved Job Action Item.'))

  } catch (error) {
    yield put(setActionItemsLoading(false));
    console.error(error);
  }
};

export function* fetchCaseActionItems (action: InitActionType) {
  const { url } = action;

  try {
    yield put(setActionItemsLoading(true));
    const response: AxiosJobActionItemsType = yield axios.get(url);
    const resData = response.data.data;
    yield put(setJobActionItems(resData));
    yield put(setActionItemsLoading(false));

  } catch (error) {
    yield put(setActionItemsLoading(false));
    console.error(error);
  }
};

export function* fetchCaseDetailsTabData (action: CaseDetailTabSagaType) {
  const { url, data } = action;
  const { tabKey } = data;

  try {
    yield put(setCaseTabDataLoading(true));
    const response: AxiosCaseDetailsTabDataType = yield getAxiosInstance().get(url);
    const resData = response.data.data;
    yield put(setCaseTabData({ data: resData, tab: tabKey }));
    yield put(setCaseTabDataLoading(false));

  } catch (error) {
    yield put(setCaseTabDataLoading(false));
    console.error(error);
  }
};

export function* escalateCase (action: InitCaseEscalate) {
  const { url, data } = action;

  try {
    yield put(setCaseEscalationStatus(true));
    const response: AxiosGenericSuccessResData = yield getAxiosInstance().post(url, data);
    yield put(setCaseEscalationStatus(false));
    yield put(setSuccessSave(response.data.StatusDescription));
    yield put(initFetchCaseRequestNotes(data.requestId));
  } catch (error) {
    const axiosError = error as AxiosErrorResponse
    yield put(setCaseEscalationStatus(false));
    yield put(setNetworkError(axiosError.response.data.StatusDescription));
    console.error(error);
  }
};


export function* addRequestNote (action: InitAddNote) {
  const { url, data } = action;
  const caseId = data.get('requestId') || '';
  const headers = {
    'Content-Type': 'multipart/form-data;'
  };

  try {
    yield put(setNoteSavingStatus(true));
    const response: AxiosGenericSuccessResData =
      yield getAxiosInstance().post(url, data, { headers });
    yield put(setNoteSavingStatus(false));
    yield put(setSuccessSave(response.data.StatusDescription));
    
    if (caseId && typeof caseId === 'string') {
      yield put(initFetchCaseRequestNotes(parseInt(caseId)));
    }
  } catch (error) {
    const axiosError = error as AxiosErrorResponse
    yield put(setNoteSavingStatus(false));
    yield put(setNetworkError(axiosError.response.data.StatusDescription));
    console.error(error);
  }
};

export function* downloadAttachment(action: InitFileDownloadType) {
  const { url, filename } = action;


  try {
    yield put(setAttachmentDownloading(true));
    const response: AxiosDownloadAttachmentType = yield axios.get(url, {
      headers: { Authorization: `Bearer ${getAccessToken()}`}
    });
    const fileData = response.data.data.file;

    const base64Data = fileData.split(',').pop();

    yield put(setAttachmentDownloading(false));
    if (!base64Data) return;

    const byteCharacters = atob(base64Data);
    const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray]);

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    yield put(setAttachmentDownloading(false));
    yield put(setNetworkError(axiosError.response.data.StatusDescription));
    console.error(error);
  }
};
