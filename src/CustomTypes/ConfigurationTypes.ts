export type AccountSummaryType = {
  abn: string,
  repairerName: string,
  streetAddress: string,
  retailerSupportLine: string,
  consumerSupportLine: string,
  contactEmail: string,
  suburb: string,
  state: string,
  postalcode: string,
  websiteUrl: string,
  nationwidePickup: boolean,
  user: {
    identifier: string
  },
  availability: boolean,
  minFee: number,
  deliveryNote: string,
  advertiseMessage: string,
};

export type AccountSummarySaveType = {
  abn: string,
  name: string,
  address: string,
  retailerSupportLine: string,
  consumerSupportLine: string,
  email: string,
  suburb: string,
  state: string,
  postCode: string,
  website: string,
};


export type InitUpdateAccountSummaryType = {
  type: string,
  url: string,
  data: AccountSummarySaveType,
};

export type InitUpdateAvailabilityType = {
  type: string,
  url: string,
  value: boolean,
};

export type InitFetchAccountSummaryType = {
  type: string,
  url: string,
};

export type AccountSummaryResType = {
  message: string,
  status: number,
  data: AccountSummaryType,
};

export type AxiosAccountSummaryResType = { 
  data: AccountSummaryResType,
};

export type UpdateLoginObjType = {
  originalPassword: string,
  newPassword: string,
  retypePassword: string,
};

export type InitUpdateLoginDetailsType = {
  type: string,
  url: string,
  data: UpdateLoginObjType,
};

export type InitUpdatePickupType = {
  type: string,
  url: string,
  value: boolean,
};

export type JobSettingUpdateData = {
  minFee: number,
  deliveryNote: string,
  advertiseMessage: string,
};


export type InitUpdateJobSettingType = {
  type: string,
  url: string,
  data: JobSettingUpdateData,
};