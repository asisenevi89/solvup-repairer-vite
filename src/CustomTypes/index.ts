import { Moment } from 'moment';
import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import {
  COLUMN_ID,
  COLUMN_CUSTOMER,
  COLUMN_PRODUCT,
  COLUMN_BRAND,
  COLUMN_STORE,
} from "../Utils/Constants";

export type TabImageType = { [k: string]: ReactNode }
export type SelectItemType = { value: number, label: string }

export type InitActionType = {
  type: string
  url: string,
  data?: object
};

export type DateType = Moment | null;
export type ListValueType = number | string;
export type DataIdType = number | string;
export type FileUploadType = FileList | null;

export type TableRowIdType = number | string;
export type TableRowDataType = number | string | boolean | ReactNode;
export type TableHeaderType = { key: string, label: string, isHidden?: boolean }
export type RowActionType = {
  action: string,
  handler: (rowId: TableRowDataType ) => void,
  // component?: ReactElement,
  component?: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>,
};
export type Order = 'asc' | 'desc';
export type RowObjectType = {
  [k: string]: TableRowDataType
};

export type LayoutLinkType = {
  key: string,
  text: string,
  icon: ReactNode,
};

export type LoginType = {
  identifier: string,
  password: string,
};

export type LoginDataType =  {
  _id: string | number,
  name: string,
  email: string,
  retailerSupportLine: string,
  abn: number,
  customerSupportLine: string,
  suburb: string,
  address: string,
  postcode: number,
  state: string,
  website: string,
  identifier: string,
  systems: string[],
  status: boolean,
  image?: string,
  accessToken: string,
  refreshToken: string,
};

export type LoginResDataType = {
  message: string,
  status: string,
  accessToken: string,
  user: {
    id: number,
    fullname: string,
    email: string,
    type: string,
    storeId: string,
  },
};

export type JobListFetchType = {
  size: number,
  page: number,
  order: Order,
  orderBy: keyof RowObjectType,
  id?: number | string,
  customer?: string,
  product?: string,
  brand?: string,
  store?: string,
  fromDate?: string,
  status?: number[],
};

export type JobType = {
  id: string | number,
  _id: string,
  updated: string,
  brandName: string,
  statusText: string,
  repairerName: string,
  overdue: number,
  lastName: string,
  productName: string,
  productBrand: string,
  storeName: string,
  statusCode: number,
  created: string,
  // progress: number,
};

export type JobResponseDataType = {
  totalCount: number,
  records: JobType[],
}

export type JobStatusType = {
  statusCode: number,
  statusInternalDesc: string,
  statusDesc: string,
  reportingText: string,
  statusEvent: string,
  count?: number,
}

export type BookmarkedStatusType = {
  id: number,
  userId: number,
  statusCode: number,
  description: string,
  caseCount: number,
}

export type BookmarkedStatusListResType = {
  Status: string,
  StatusDescription: string,
  data: BookmarkedStatusType[],
}

export type InitBookmarkDeleteType = {
  type: string
  url: string,
  id: number,
}

export type JobStatusListResType = {
  status: boolean,
  message: string,
  data: JobStatusType[],
}

export type JobResType = {
  status: boolean,
  message: string,
  data: JobType,
}
export type CellRenderType = { [k: string]: (value:string) => ReactNode };
export type StateActionType = { type: string, payload: string };
export type StateFilterType = {
  [COLUMN_ID]: string,
  [COLUMN_CUSTOMER]: string,
  [COLUMN_PRODUCT]: string,
  [COLUMN_BRAND]: string,
  [COLUMN_STORE]: string,
};
export type TextFilterKey = 
  typeof COLUMN_ID | typeof COLUMN_CUSTOMER | typeof COLUMN_PRODUCT | typeof COLUMN_BRAND | typeof COLUMN_STORE;
export type TextFilters = { value: TextFilterKey,  label: string }

export type CommonObjType = { [k: string]: string };

export type RequestNoteType = {
  _id: string,
  jobId: string,
  submittedBy: string,
  staffId: string,
  status: string,
  updated: string,
  attachment: string,
  notes: string,
};

export type ReqNoteResType = {
  status: boolean,
  message: string,
  data: RequestNoteType[],
};

export type ConsignmentNoteType = {
  courier: string,
  noteNumber: string | number,
  comments?: string,
};

export type AssessmentDateType = {
  date: string,
  reason: string,
  remarks?: string,
};

export type CheckInItemType = {
  status?: true,
  date?: string,
  referenceNumber?: string,
  notes?: string
};

export type VisualInspectionType = {
  liabilityType: string,
  reasonForChange: string,
  partsPrice: number,
  labourPrice: number,
  returnFreight: number,
  totalPrice: number,
  referenceNumber?: string,
  details: string
};

export type RectificationType = {
  outcome: string,
  faultParts: string[],
  replaceParty?: string,
  isCompletedAtQuotedRate?: boolean,
  isCompletedToday?: boolean,
  completedDate?: string,
  workDetails: string,
};

export type ConfirmAssessmentType = boolean;

export type AssessmentOutcomeType = {
  isApproved: boolean,
  rejectReason: string,
  detailsOfOutcome: string,
};

export type RepairAssessmentOutcomeType = {
  isEligible: boolean,
  isRepairable: boolean,
  assessmentDetails: string,
};

export type ProvideAQuoteType = {
  isQuoted: boolean,
  partsPrice?: number,
  labourPrice?: number,
  freightPrice?: number,
  travelPrice?: number,
  totalPrice?: number,
  gst?:number,
  totalWithGST?: number,
  referenceNumber?: string,
  details: string
};

export type PartsOnOrderType = {
  submitted?: boolean,
  etaOnParts?: string,
};

export type DispatchReadyType = {
  courier: string,
  noteNumber: string | number,
  dispatchTo: 'string',
  comments?: string,
};

export type PickupConfirmType = {
  date: string,
};

export type PickupItemType = {
  notes?: string,
  status: boolean,
};

export type ActionSaveDataType =
  ConsignmentNoteType |
  AssessmentDateType |
  CheckInItemType |
  VisualInspectionType |
  RectificationType |
  ConfirmAssessmentType |
  AssessmentOutcomeType |
  RepairAssessmentOutcomeType |
  ProvideAQuoteType |
  PartsOnOrderType |
  DispatchReadyType |
  PickupConfirmType |
  PickupItemType;

export type JobActionItemsType = {
  consignmentNote?: ConsignmentNoteType,
  assessmentDate?: AssessmentDateType,
  checkInItem?: CheckInItemType,
  visualInspection?: VisualInspectionType,
  rectification?: RectificationType,
  confirmAssessment?: ConfirmAssessmentType,
  assessmentOutcome?: AssessmentOutcomeType,
  repairAssessmentOutcome?: RepairAssessmentOutcomeType,
  provideAQuote?: ProvideAQuoteType,
  partsOnOrder?: PartsOnOrderType,
  dispatchReadyNote?: DispatchReadyType,
  pickupConfirm?: PickupConfirmType,
  pickupItem?: PickupItemType,
};

export type InitJobActionSaveType = {
  type: string
  url: string,
  data: { itemKey: string, actionData: ActionSaveDataType },
};

export type JobActionItemsResType = {
  status: boolean,
  message: string,
  data: JobActionItemsType,
};


export type EscalationCaseType = {
  escalationNotes: string,
};

export type NoteFormType = {
  notes: string,
}

export type PickupPointType = {
  city: string,
  state: string,
  suburb: string,
  postcode: number,
}

export type WarrantyBrandType = {
  id: number,
  name: string,
  groups: number[],
};

export type WarrantyGroupType = {
  id: number,
  name: string,
  products: number[],
};

export type AutocompletePrediction = google.maps.places.AutocompletePrediction;
export type PlaceResult =  google.maps.places.PlaceResult;

export type AnnouncementContentType = {
  subHeader: string,
  textLines: string[],
}

export type AnnouncementType = {
  id: number,
  title: string,
  header: string,
  content: AnnouncementContentType[],
  announcementStatus: string,
  announcementType: string,
  createdAt: string,
  updatedAt: string,
}

export type AnnouncementsListResType = {
  Status: string,
  StatusDescription: string,
  data: AnnouncementType[],
}

export interface AxiosGenericSuccessResData {
  Status: string,
  StatusDescription: string,
  data: CommonObjType,
  message: string,
}

export interface AxiosGenericErrorResData {
  Status: string,
  StatusDescription: string,
  data: object,
  message: string,
}

export interface AxiosErrorResponse {
  response: {
    data: AxiosGenericSuccessResData,
  }
  message: string,
  status: number,
}

export type CaseDetailTabItem = {
  id: number,
  label: string,
  name: string,
  value: string,
  type: string,
  editable: boolean,
  theme: object,
  toolTipText: string,
};

export type CaseDetailTabData = {
  title: string,
  fields: CaseDetailTabItem[],
};

export type CaseDetailTabResDataType = {
  Status: string,
  StatusDescription: string,
  data: CaseDetailTabData,
}

export type CaseDetailTabSagaType = {
  type: string,
  url: string,
  data: { tabKey: string },
}

export type InitCaseEscalateData = {
  requestId: number,
  notes: string,
};

export type InitCaseEscalate = {
  type: string,
  url: string,
  data: InitCaseEscalateData
};

export type InitAddNote = {
  type: string,
  url: string,
  data: FormData
};

export type InitFileDownloadType = {
  type: string,
  url: string,
  filename: string
};

export type DownloadResType = {
  status: boolean,
  message: string,
  data: {
    file: string,
  },
};
