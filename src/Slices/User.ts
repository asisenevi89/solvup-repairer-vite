import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _set from 'lodash/set';

const initialState = {
  isLoading: false,
  data: {},
  lastSuccessLogin: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      _set(state, 'isLoading', action.payload);
    },
    setUserData(state, action: PayloadAction<object>) {
      _set(state, 'data', action.payload);
    },
    setLastSuccessLogin(state, action: PayloadAction<number>) {
      _set(state, 'lastSuccessLogin', action.payload);
    }
  },
  selectors: {
    makeRepairerLoading: state => state.isLoading,
    makeUserData: state => state.data,
    makeLastSuccessLogin: state => state.lastSuccessLogin,
  }
})

export const {
  setUserLoading,
  setUserData,
  setLastSuccessLogin,
} = userSlice.actions;

export const {
  makeRepairerLoading,
  makeUserData,
  makeLastSuccessLogin,
} = userSlice.selectors;

export default userSlice.reducer;
