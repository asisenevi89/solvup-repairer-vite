import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _set from "lodash/set";
import { AccountSummaryType, JobSettingUpdateData, PostcodesFetchData } from "../CustomTypes/ConfigurationTypes";
import { defaultAccountSummary } from "../Utils/Constants";

const initialState = {
  isAccountSummaryLoading: false,
  accountSummary: defaultAccountSummary,
  isAccountSummaryUpdating: false,
  isLoginDetailsUpdating:false,
  isNationWidePickupUpdating: false,
  isJobSettingUpdating: false,
  isAvailabilityUpdating: false,
  isPostCodeListLoading: false,
  postcodeList: {
    totalRecords: 0,
    records: []
  },
  isPostCodesSaving: false,
};

const configurationSlice = createSlice({
  name: "configurations",
  initialState,
  reducers: {
    setAccountSummaryLoading: (state, action: PayloadAction<boolean>) => {
      _set(state, "isAccountSummaryLoading", action.payload);
    },
    setAccountSummary: (state, action: PayloadAction<AccountSummaryType>) => {
      _set(state, "accountSummary", action.payload);
    },
    setAccountSummaryUpdateStatus: (state, action: PayloadAction<boolean>) => {
      _set(state, "isAccountSummaryUpdating", action.payload);
    },
    setPickupStatus: (state, action: PayloadAction<boolean>) => {
      _set(state, 'accountSummary.nationwidePickup', action.payload);
    },
    setPickupStatusUpdating: (state, action: PayloadAction<boolean>) => {
      _set(state, 'isNationWidePickupUpdating', action.payload);
    },
    setLoginDetailsUpdateState: (state, action: PayloadAction<boolean>) => {
      _set(state, 'isLoginDetailsUpdating', action.payload);
    },
    setJobSettings: (state, action: PayloadAction<JobSettingUpdateData>) => {
      return {
        ...state,
        accountSummary: {
          ...state.accountSummary,
          ...action.payload,
        },
      };
    },
    setJobSettingUpdating: (state, action: PayloadAction<boolean>) => {
      _set(state, 'isJobSettingUpdating', action.payload);
    },
    setAvailability: (state, action: PayloadAction<boolean>) => {
      _set(state, 'accountSummary.availability', action.payload);
    },
    setAvailabilityUpdating: (state, action: PayloadAction<boolean>) => {
      _set(state, 'isAvailabilityUpdating',  action.payload);
    },
    setPostcodeList: (state, action: PayloadAction<PostcodesFetchData>) => {
      _set(state, 'postcodeList',  action.payload);
    },
    setPostcodeListLoading: (state, action: PayloadAction<boolean>) => {
      _set(state, 'isPostCodeListLoading',  action.payload);
    },
    setPostcodesSaving: (state, action: PayloadAction<boolean>) => {
      _set(state, 'isPostCodesSaving',  action.payload);
    }
  },
  selectors: {
    makeAccountSummaryLoading: state => state.isAccountSummaryLoading,
    makeAccountSummary: state => state.accountSummary,
    makeAccountSummaryUpdating: state => state.isAccountSummaryUpdating,
    makeUserIdentifier: state => state.accountSummary.user.identifier,
    makePickupStatus: state => state.accountSummary.nationwidePickup,
    makeLoginDetailsUpdating: state => state.isLoginDetailsUpdating,
    makePickupStatusUpdating: state => state.isNationWidePickupUpdating,
    makeJobSettings: state => {
      const { minFee, deliveryNote, advertiseMessage } = state.accountSummary
      return { minFee, deliveryNote, advertiseMessage };
    },
    makeJobSettingsUpdating: state => state.isJobSettingUpdating,
    makeAvailabilityUpdating: state => state.isAvailabilityUpdating,
    makePostcodeData: state => {
      const { records, totalRecords } = state.postcodeList;
      const filteredData = records.map(record => {
        const { id, city, state, suburb, postcode } = record
        return { id, city, state, suburb, postcode }
      });

      return {
        totalRecords,
        records: filteredData,
      };
    },
    makePostcodeListLoading: state => state.isPostCodeListLoading,
    makePostcodesSaving: state => state.isPostCodesSaving,
  },
});

export const {
  setAccountSummaryLoading,
  setAccountSummary,
  setAccountSummaryUpdateStatus,
  setLoginDetailsUpdateState,
  setPickupStatus,
  setPickupStatusUpdating,
  setJobSettings,
  setJobSettingUpdating,
  setAvailability,
  setAvailabilityUpdating,
  setPostcodeList,
  setPostcodeListLoading,
  setPostcodesSaving,
} = configurationSlice.actions;

export const {
  makeAccountSummaryLoading,
  makeAccountSummary,
  makeAccountSummaryUpdating,
  makeUserIdentifier,
  makePickupStatus,
  makeLoginDetailsUpdating,
  makePickupStatusUpdating,
  makeJobSettings,
  makeJobSettingsUpdating,
  makeAvailabilityUpdating,
  makePostcodeData,
  makePostcodeListLoading,
  makePostcodesSaving,
} = configurationSlice.selectors;

export default configurationSlice.reducer;

