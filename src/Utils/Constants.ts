export const DEFAULT_CURRENCY = '$';
export const LOADER_TIME = 3000;
export const DEFAULT_DATE_TIME_FORMAT = 'DD-MM-YYYY hh:mm A';
export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'
export const DEFAULT_GST = 10;
export const DEFAULT_BE = 'SolveUp';

export const LEARN_MORE_LINK = '#' // needed to be updated
export const PRIVACY_POLICY_LINK = '#' // needed to be updated
export const TERMS_OF_SERVICE_LINK = '#' // needed to be updated
export const LOGIN_HELP_LINK = '#' // needed to be updated

export const SUPPORT_EMAIL = 'support@solvup.com';
export const SUPPORT_PHONE = '1800 653 299'

export const COLUMN_ID = 'id';
export const COLUMN_CUSTOMER = 'customer';
export const COLUMN_PRODUCT = 'product';
export const COLUMN_BRAND = 'brand';
export const COLUMN_STORE = 'store';
export const COLUMN_DATE = 'date';
export const COLUMN_STATUS = 'status';

export const TABLE_BLUE_MSG = 
  'Items shown with blue tint are consumer repairs and fall outside of warranty and assess for repair period or involve misuse.';
export const TABLE_RED_MSG =
  'Items shown with red tint have been escalated and may require intervention.';
export const TABLE_ORANGE_MSG = 
  'Items shown with orange tint has been marked as having lost customer contact.';

export const PUBLIC_ROUTES = ['/'];

export const CASE_SUMMARY = 'caseSummary';
export const PRODUCT = 'productDetails';
export const FAULT_PAPERWORK = 'faultDetails';
export const ITEM_LOCATION = 'itemLocation';
export const CUSTOMER = 'customerDetails';
export const TIMING = 'timing';
export const COMMUNICATION_LOG = 'communicationLog';

export const SUMMARY_TABS = [
  CASE_SUMMARY,
  PRODUCT,
  FAULT_PAPERWORK,
  ITEM_LOCATION,
  CUSTOMER,
  TIMING,
  COMMUNICATION_LOG,
];
export const DISABLE_SUMMARY = [TIMING, COMMUNICATION_LOG];

export const NEXT_ACTION = 'nextAction';
export const NOTES = 'notes';
export const ESCALATION = 'escalation';
export const CONTACT_CUSTOMER = 'contactCustomer';
export const CUSTOMER_DISPATCH_DATE = 'customerDispatchDate';

export const ACTION_TABS = [
  NEXT_ACTION,
  NOTES,
  ESCALATION,
  CONTACT_CUSTOMER,
  CUSTOMER_DISPATCH_DATE,
]
export const DISABLE_ACTIONS = [CONTACT_CUSTOMER, CUSTOMER_DISPATCH_DATE];

export const COURIERS = [
  { value: 'australianPost', label: 'Australian Post' },
  { value: 'dhl', label: 'DHL' },
  { value: 'aramex', label: 'Aramex' },
  { value: 'starTrack', label: 'StarTrack' },
];

export const CONSIGN_REASONS = [
  { value: 'damaged', label: 'Damaged' },
  { value: 'expired', label: 'Expired' },
  { value: 'mismatched', label: 'Mismatched' },
  { value: 'incompatible', label: 'Incompatible' },
  { value: 'warranty', label: 'Warranty' },
];

export const REPAIR_OUTCOMES = [
  { value: 'yes', label: 'Yes, the fault could be replicated, Repaired' },
  { value: 'no', label: 'No, the fault could not be replicated' },
];

export const REPAIR_PARTS = [
  { value: 'battery',  label: 'Battery' },
  { value: 'powerSupply',  label: 'Power Supply' },
  { value: 'softwareOrFirmware',  label: 'Software or Firmware' },
  { value: 'logicBoard',  label: 'Logic Board' },
  { value: 'keyboard',  label: 'Keyboard' },
  { value: 'speaker',  label: 'Speaker' },
  { value: 'hardDisk',  label: 'Hard Disk' },
  { value: 'other',  label: 'Other' },
];

export const ACCOUNT_SUMMARY = 'accountSummary';
export const CHANGE_DETAILS = 'changeDetails';
export const LOGIN_DETAILS = 'loginDetails';
export const PICKUP_ZONES = 'pickupZones'
export const PRODUCTS_WE_REPAIR = 'productsWeRepair';
export const REPAIRER_JOB_SETTING = 'repairerJobSetting';
export const CONFIG_DOCS = 'docs';

export const STATES = [
  { value: 'wa',  label: 'Western Australia' },
  { value: 'nt',  label: 'Northern Territory' },
  { value: 'sa',  label: 'South Australia' },
  { value: 'nws',  label: 'New South Wales' },
  { value: 'qld',  label: 'Queensland' },
  { value: 'vic',  label: 'Victoria' },
  { value: 'tas',  label: 'Tasmania' },
  { value: 'act',  label: 'Australian Capital Territory' },
];

export const REPAIR_SYSTEMS = [
  { value: 'awa',  label: 'AWA' },
  { value: 'ays',  label: 'AYS (At Your Service Software)' },
  { value: 'jim2',  label: 'Jim2 / Happen' },
  { value: 'linkTechnologies',  label: 'Link Technologies' },
  { value: 'ncss',  label: 'NCSS' },
  { value: 'intelogy',  label: 'Intelogy (Paperworks)' },
  { value: 'filemaker',  label: 'Filemaker' },
];