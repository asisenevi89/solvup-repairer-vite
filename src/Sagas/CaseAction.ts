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
} from '../Slices/CaseAction';
import { setSuccessSave } from "../Slices/General";
import { getAxiosInstance } from "../Utils/Helpers";
import {
  InitActionType,
  InitJobActionSaveType,
  ReqNoteResType,
  JobActionItemsResType,
  CaseDetailTabResDataType,
  CaseDetailTabSagaType,
} from "../CustomTypes";
import { AxiosJobListResponseType } from "./CaseList";

type AxiosJobReqNotesType = {
  data: ReqNoteResType,
}

type AxiosJobActionItemsType = {
  data: JobActionItemsResType
}

type AxiosCaseDetailsTabDataType = {
  data: CaseDetailTabResDataType
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
