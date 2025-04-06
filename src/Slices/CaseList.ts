import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _set from 'lodash/set';
import _get from 'lodash/get';
import {
  JobStatusType,
  BookmarkedStatusType,
  AnnouncementType,
} from '../CustomTypes';

const initialState = {
  isJobListLoading: false,
  jobList: {
    totalCount: 0,
    records: []
  },
  isJobStatusListLoading: false,
  jobStatusList: [],
  bookmarkedStatues: [],
  isBookmarkedStatuesLoading: false,
  isBookmarkListSaving: false,
  lastBookmarkSave: 0,
  selectedJobStatus: [],
  announcementList: [],
  isAnnouncementListLoading: false,
};

const jobSlice = createSlice({
  name: 'caseList',
  initialState,
  reducers: {
    setJobsLoading: (state, action: PayloadAction<boolean>) => {
      _set(state, 'isJobListLoading', action.payload);
    },
    setJobs(state, action: PayloadAction<object>) {
      _set(state, 'jobList', action.payload);
    },
    setJobStatusesLoading(state, action: PayloadAction<boolean>) {
      _set(state, 'isJobStatusListLoading', action.payload);
    },
    setJobStatusList(state, action: PayloadAction<JobStatusType[]>) {
      _set(state, 'jobStatusList', action.payload);
    },
    setBookmarkedStatusesLoading(state, action: PayloadAction<boolean>) {
      _set(state, 'isBookmarkedStatuesLoading', action.payload);
    },
    setBookmarkedStatusList(state, action: PayloadAction<BookmarkedStatusType[]>) {
      _set(state, 'bookmarkedStatues', action.payload);
    },
    updateBookmarkStatuesAfterDelete(state, action: PayloadAction<number>) {
      const list: BookmarkedStatusType[] = _get(state, 'bookmarkedStatues', []);
      const updated = list.filter(item => item.id !== action.payload);
      _set(state, 'bookmarkedStatues', updated);
    },
    setLastBookmarkSave(state, action: PayloadAction<number>) {
      _set(state, 'lastBookmarkSave', action.payload);
    },
    setBookmarkSaving(state, action: PayloadAction<boolean>) {
      _set(state, 'isBookmarkListSaving', action.payload);
    },
    setSelectedJobStatus(state, action: PayloadAction<number[]>) {
      _set(state, 'selectedJobStatus', action.payload);
    },
    setAnnouncementListLoading(state, action: PayloadAction<boolean>) {
      _set(state, 'isAnnouncementListLoading', action.payload);
    },
    setAnnouncementList(state, action: PayloadAction<AnnouncementType[]>) {
      _set(state, 'announcementList', action.payload);
    },
  },
  selectors: {
    makeJobList: state => state.jobList,
    makeJobListLoading: state => state.isJobListLoading,
    makeJobStatusListLoading: state => state.isJobStatusListLoading,
    makeJobStatusList: state => state.jobStatusList,
    makeBookmarkedStatusesLoading: state => state.isBookmarkedStatuesLoading,
    makeBookmarkedStatuses: state => state.bookmarkedStatues,
    makeBookmarkLastSave: state => state.lastBookmarkSave,
    makeBookmarkListSaving: state => state.isBookmarkListSaving,
    makeSelectedJobStatus:  state => state.selectedJobStatus,
    makeAnnouncementList: state => state.announcementList,
    makeAnnouncementListLoading: state => state.isAnnouncementListLoading,
  }
})

export const {
  setJobsLoading,
  setJobs,
  setJobStatusesLoading,
  setJobStatusList,
  setBookmarkedStatusesLoading,
  setBookmarkedStatusList,
  setSelectedJobStatus,
  updateBookmarkStatuesAfterDelete,
  setLastBookmarkSave,
  setBookmarkSaving,
  setAnnouncementListLoading,
  setAnnouncementList,
} = jobSlice.actions;

export const  {
  makeJobListLoading,
  makeJobList,
  makeJobStatusListLoading,
  makeJobStatusList,
  makeBookmarkedStatusesLoading,
  makeBookmarkedStatuses,
  makeBookmarkLastSave,
  makeBookmarkListSaving,
  makeSelectedJobStatus,
  makeAnnouncementList,
  makeAnnouncementListLoading,
} = jobSlice.selectors

export default jobSlice.reducer;
