import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _set from 'lodash/set';

const initialState = {
  networkErrors: [],
  successSaves: [],
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setNetworkError: (state, action: PayloadAction<string>) => {
      _set(state, 'networkErrors', [...state.networkErrors, action.payload]);
    },
    setSuccessSave(state, action: PayloadAction<string>) {
      _set(state, 'successSaves', [...state.successSaves, action.payload]);
    },
    clearNetworkErrors(state) {
      _set(state, 'networkErrors', []);
    },
    clearDataSaves(state) {
      _set(state, 'successSaves', []);
    }
  },
  selectors: {
    makeNetworkErrors: state => state.networkErrors,
    makeSuccessSaves:  state => state.successSaves,
  }
})

export const {
  setNetworkError,
  setSuccessSave,
  clearNetworkErrors,
  clearDataSaves
} = generalSlice.actions;


export const {
  makeNetworkErrors,
  makeSuccessSaves,
} = generalSlice.selectors;

export default generalSlice.reducer;
