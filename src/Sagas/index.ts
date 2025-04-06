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
} from './CaseAction'


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
};

export default function* rootSaga() {
  yield all([
    watchUser(),
    watchCaseList(),
    watchCaseAction(),
  ]);
}