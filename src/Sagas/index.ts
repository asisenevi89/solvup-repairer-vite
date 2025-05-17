import { takeLatest, all } from 'redux-saga/effects'
import {
  INIT_USER_LOGIN,
  INIT_FETCH_JOB_LIST,
  INIT_FETCH_JOB_STATUSES,
  INIT_FETCH_BOOKMARKED_STATUSES,
  INIT_FETCH_JOB_BY_ID,
  INIT_FETCH_REQUEST_NOTES,
  INIT_FETCH_JOB_ACTION_ITEMS,
  INIT_SAVE_JOB_ACTION_ITEMS,
  INIT_DELETE_BOOKMARKED_STATUSES,
  INIT_SAVE_BOOKMARKED_STATUSES,
  INIT_FETCH_ANNOUNCEMENTS,
  INIT_FETCH_CASE_DETAILS_TAB_DATA,
  INTI_ESCALATE_CASE,
  INIT_ADD_REQUEST_NOTE,
  INIT_FETCH_ACCOUNT_SUMMARY,
  INIT_UPDATE_ACCOUNT_DETAILS,
  INIT_UPDATE_LOGIN_DETAILS,
  INIT_UPDATE_NATIONWIDE_PICKUP,
  INIT_UPDATE_JOB_SETTINGS,
  INIT_UPDATE_REPAIRER_AVAILABILITY,
  INIT_FETCH_SAVED_POSTCODES,
  INIT_SAVE_POSTCODES,
  INIT_DOWNLOAD_NOTE_ATTACHMENT,
} from "../ActionCreators/ActionTypes";
import { loginUser } from './User';
import {
  fetchCases,
  fetchCaseStatuses,
  fetchBookmarkedStatuses,
  deleteBookmarkedStatus,
  saveBookmarkList,
  fetchAnnouncements,
} from './CaseList';
import {
  fetchCaseById,
  fetchCaseRequestNotes,
  saveCaseActionItem,
  fetchCaseActionItems,
  fetchCaseDetailsTabData,
  escalateCase,
  addRequestNote,
  downloadAttachment,
} from './CaseAction'
import {
  fetchAccountSummary,
  fetchPostcodeList,
  savePostcodes,
  updateAccountSummary,
  updateJobSettings,
  updateLoginDetails,
  updateNationwidePickup,
  updateRepairerAvailability,
} from './Configurations';


export function* watchUser () {
  yield takeLatest(INIT_USER_LOGIN, loginUser);
};
export function* watchCaseList () {
  yield takeLatest(INIT_FETCH_JOB_LIST, fetchCases);
  yield takeLatest(INIT_FETCH_JOB_STATUSES, fetchCaseStatuses);
  yield takeLatest(INIT_FETCH_BOOKMARKED_STATUSES, fetchBookmarkedStatuses);
  yield takeLatest(INIT_DELETE_BOOKMARKED_STATUSES, deleteBookmarkedStatus);
  yield takeLatest(INIT_SAVE_BOOKMARKED_STATUSES, saveBookmarkList);
  yield takeLatest(INIT_FETCH_ANNOUNCEMENTS, fetchAnnouncements);
};

export function* watchCaseAction () {
  yield takeLatest(INIT_FETCH_JOB_BY_ID, fetchCaseById);
  yield takeLatest(INIT_FETCH_REQUEST_NOTES, fetchCaseRequestNotes);
  yield takeLatest(INIT_FETCH_JOB_ACTION_ITEMS, fetchCaseActionItems);
  yield takeLatest(INIT_SAVE_JOB_ACTION_ITEMS, saveCaseActionItem);
  yield takeLatest(INIT_FETCH_CASE_DETAILS_TAB_DATA, fetchCaseDetailsTabData);
  yield takeLatest(INTI_ESCALATE_CASE, escalateCase);
  yield takeLatest(INIT_ADD_REQUEST_NOTE, addRequestNote);
  yield takeLatest(INIT_DOWNLOAD_NOTE_ATTACHMENT, downloadAttachment);
};

export function* watchConfigurations () {
  yield takeLatest(INIT_FETCH_ACCOUNT_SUMMARY, fetchAccountSummary);
  yield takeLatest(INIT_UPDATE_ACCOUNT_DETAILS, updateAccountSummary);
  yield takeLatest(INIT_UPDATE_LOGIN_DETAILS, updateLoginDetails);
  yield takeLatest(INIT_UPDATE_NATIONWIDE_PICKUP, updateNationwidePickup);
  yield takeLatest(INIT_FETCH_SAVED_POSTCODES, fetchPostcodeList);
  yield takeLatest(INIT_SAVE_POSTCODES, savePostcodes);
  yield takeLatest(INIT_UPDATE_JOB_SETTINGS, updateJobSettings);
  yield takeLatest(INIT_UPDATE_REPAIRER_AVAILABILITY, updateRepairerAvailability);
};

export default function* rootSaga() {
  yield all([
    watchUser(),
    watchCaseList(),
    watchCaseAction(),
    watchConfigurations(),
  ]);
}