import { AccountSummarySaveType, JobSettingUpdateData, UpdateLoginObjType } from "../CustomTypes/ConfigurationTypes";
import {
  INIT_FETCH_ACCOUNT_SUMMARY,
  INIT_UPDATE_ACCOUNT_DETAILS,
  INIT_UPDATE_JOB_SETTINGS,
  INIT_UPDATE_LOGIN_DETAILS,
  INIT_UPDATE_NATIONWIDE_PICKUP,
  INIT_UPDATE_REPAIRER_AVAILABILITY
} from "./ActionTypes";

export const initFetchAccountSummary = () => {
  const url = '/users/account-summary';

  return {
    url,
    type: INIT_FETCH_ACCOUNT_SUMMARY
  };
};

export const initUpdateAccountSummary = (data: AccountSummarySaveType) => {
  const url = '/users/update-contact-details';
  
  return {
    url,
    type: INIT_UPDATE_ACCOUNT_DETAILS,
    data,
  };
};

export const initUpdateRepairerAvailability = (value: boolean) => {
  const url = `/users/availability/${value}`;

  return  {
    url,
    type: INIT_UPDATE_REPAIRER_AVAILABILITY,
    value,
  };
};

export const initUpdateLoginDetails = (data: UpdateLoginObjType) => {
  const url = '/users/update-password'

  return {
    url,
    type: INIT_UPDATE_LOGIN_DETAILS,
    data,
  };
};

export const initUpdateNationwidePickup = (value: boolean) => {
  const url = `config/postcodes/toggle-pickup?pickup=${value}`;

  return {
    url,
    type: INIT_UPDATE_NATIONWIDE_PICKUP,
    value,
  };
};

export const initUpdateJobSettings = (data: JobSettingUpdateData) => {
  const url = `config/repairer-settings/configure`;

  return {
    url,
    type: INIT_UPDATE_JOB_SETTINGS,
    data,
  };
};
