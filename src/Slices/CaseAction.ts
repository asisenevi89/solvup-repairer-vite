import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _set from 'lodash/set';
import {
  RequestNoteType,
  ActionSaveDataType,
  JobActionItemsType,
  JobType,
  CaseDetailTabData,
} from '../CustomTypes';

export type CaseDetailState = {
  caseAction: {
    selectedJob: JobType | {},
    caseTabData: CaseTabDataType,
    caseTabDataLoading: boolean,
    isSelectedJobLoading: boolean,
    requestNotes: [],
    isRequestNotesLoading: boolean,
    isLoadingActionItems: boolean,
    jobActionItems: {},
  }
};

type CaseTabDataType = {
  [key: string]: CaseDetailTabData,
}

const defaultJobType: JobType | {} = {};
const defaultCaseTabData: CaseTabDataType = {};

type SetActionItemType = {
  itemKey: string,
  data: ActionSaveDataType,
}

const initialState = {
  selectedJob: defaultJobType,
  caseTabData: defaultCaseTabData,
  caseTabDataLoading: false,
  isSelectedJobLoading: false,
  requestNotes: [],
  isRequestNotesLoading: false,
  isLoadingActionItems: false,
  jobActionItems: {},
};

const caseActionSlice = createSlice({
  name: 'caseAction',
  initialState,
  reducers: {
    setSelectedJobLoading(state, action: PayloadAction<boolean>) {
      _set(state, 'isSelectedJobLoading', action.payload);
    },
    setSelectedJob(state, action: PayloadAction<object>) {
      _set(state, 'selectedJob', action.payload);
    },
    setRequestNotes(state, action: PayloadAction<RequestNoteType[]>) {
      _set(state, 'requestNotes', action.payload);
    },
    setRequestNotesLoading(state, action: PayloadAction<boolean>) {
      _set(state, 'isRequestNotesLoading', action.payload);
    },
    setActionItemsLoading(state, action: PayloadAction<boolean>) {
      _set(state, 'isLoadingActionItems', action.payload);
    },
    setJobActionItem(state, action: PayloadAction<SetActionItemType>) {
      _set(state, `jobActionItems[${action.payload.itemKey}]`, action.payload.data);
    },
    setJobActionItems(state, action: PayloadAction<JobActionItemsType>) {
      _set(state, `jobActionItems`, action.payload);
    },
    setCaseTabData(state, action: PayloadAction<{ data: CaseDetailTabData, tab: string }>) {
      const { data, tab } = action.payload;
      _set(state, `caseTabData.${tab}`, data);
    },
    setCaseTabDataLoading(state, action: PayloadAction<boolean>) {
      _set(state, 'caseTabDataLoading', action.payload); 
    },
  },
  selectors: {
    makeSelectedJob: state => state.selectedJob,
    makeSelectedJobLoading:  state => state.isSelectedJobLoading,
    makeRequestNotes: state => state.requestNotes,
    makeRequestNotesLoading:  state => state.isRequestNotesLoading,
    makeJobActionItemsLoading: state => state.isLoadingActionItems,
    makeJobActionItems: state => state.jobActionItems,
    makeCaseTabData: (state, tabKey) => state.caseTabData[tabKey],
    makeCaseTabDataLoading: state => state.caseTabDataLoading,
  }
})

export const {
  setSelectedJobLoading,
  setSelectedJob,
  setRequestNotes,
  setRequestNotesLoading,
  setActionItemsLoading,
  setJobActionItem,
  setJobActionItems,
  setCaseTabData,
  setCaseTabDataLoading,
} = caseActionSlice.actions;

export const  {
  makeSelectedJob,
  makeSelectedJobLoading,
  makeRequestNotes,
  makeRequestNotesLoading,
  makeJobActionItemsLoading,
  makeJobActionItems,
  makeCaseTabData,
  makeCaseTabDataLoading,
} = caseActionSlice.selectors

export default caseActionSlice.reducer;
