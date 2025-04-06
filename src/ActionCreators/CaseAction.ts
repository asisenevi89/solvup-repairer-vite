import { DataIdType, ActionSaveDataType } from "../CustomTypes";

import { 
  INIT_FETCH_JOB_BY_ID,
  INIT_FETCH_REQUEST_NOTES,
  INIT_SAVE_JOB_ACTION_ITEMS,
  INIT_FETCH_JOB_ACTION_ITEMS,
  INIT_FETCH_CASE_DETAILS_TAB_DATA,
} from "./ActionTypes";

const dataUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchCaseById = (id: DataIdType) => {
  const url = `/case-data/cases?caseId=${id}`;

  return {
    type: INIT_FETCH_JOB_BY_ID,
    url,
  };
};

export const fetchCaseRequestNotes = (caseId: DataIdType) => {
  const url = `/case-data/cases/${caseId}?tab=requestNotes`;

  return {
    type: INIT_FETCH_REQUEST_NOTES,
    url,
  };
};

export const fetchCaseActionItems = (jobId: string) => {
  const url = `${dataUrl}/repairer/action-items/${jobId}`;

  return {
    type: INIT_FETCH_JOB_ACTION_ITEMS,
    url,
  };
}

export const saveCaseActionItems = (
  id: DataIdType,
  itemKey: string,
  actionData: ActionSaveDataType
) => {
  const url = `${dataUrl}/repairer/action-items`;
  const data = {
    id,
    itemKey,
    actionData
  };

  return {
    type: INIT_SAVE_JOB_ACTION_ITEMS,
    url,
    data,
  };
};

export const initCaseDetailsTabData = (caseId: DataIdType, tabKey: string) => {
  const url = `/case-data/cases/${caseId}?tab=${tabKey}`;

  return {
    type: INIT_FETCH_CASE_DETAILS_TAB_DATA,
    url,
    data: { tabKey },
  };
};
