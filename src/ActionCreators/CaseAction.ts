import {
  DataIdType,
  ActionSaveDataType,
  InitCaseEscalateData,
} from "../CustomTypes";

import { 
  INIT_FETCH_JOB_BY_ID,
  INIT_FETCH_REQUEST_NOTES,
  INIT_SAVE_JOB_ACTION_ITEMS,
  INIT_FETCH_JOB_ACTION_ITEMS,
  INIT_FETCH_CASE_DETAILS_TAB_DATA,
  INTI_ESCALATE_CASE,
  INIT_ADD_REQUEST_NOTE,
  INIT_DOWNLOAD_NOTE_ATTACHMENT,
} from "./ActionTypes";

const dataUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchCaseById = (id: DataIdType) => {
  const url = `/case-data/cases?caseId=${id}`;

  return {
    type: INIT_FETCH_JOB_BY_ID,
    url,
  };
};

export const initFetchCaseRequestNotes = (caseId: DataIdType) => {
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

export const initCaseEscalation = (data: InitCaseEscalateData) => {
  const url = '/escalate-case';

  return {
    type: INTI_ESCALATE_CASE,
    url,
    data,
  }
};

export const intiAddRequestNote = (data: FormData) => {
  const url = '/add-notes';

  return {
    type: INIT_ADD_REQUEST_NOTE,
    url,
    data,
  }
};

export const initDownloadNoteAttachment = (url: string,  filename: string) => {

  return {
    type: INIT_DOWNLOAD_NOTE_ATTACHMENT,
    url,
    filename,
  };
};

