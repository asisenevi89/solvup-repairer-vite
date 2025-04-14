import { useState, memo, ChangeEvent } from "react";
import { Typography, Tabs } from "../../UI";
import _startCase from 'lodash/startCase';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import ListIcon from '@mui/icons-material/FormatListBulleted';
import LockIcon from '@mui/icons-material/LockOutlined';
import RepairIcon from '@mui/icons-material/ConstructionOutlined';
import CogIcon from '@mui/icons-material/SettingsOutlined';
import BagIcon from '@mui/icons-material/ShoppingBagOutlined';
import ImageText from "../../Common/ImageText";
import AccountSummaryTab from "./Partials/AccountSummaryTab";
import ChangeDetailsTab from "./Partials/ChangeDetailsTab";
import JobSettingTab from "./Partials/JobSettingTab";
import LoginDetailsTab from "./Partials/LoginDetailsTab";
import PickupZonesTab from "./Partials/PickupZonesTab";
import ProductsTab from "./Partials/ProductsTab";
import './styles.scss';

import {
  ACCOUNT_SUMMARY,
  CHANGE_DETAILS,
  LOGIN_DETAILS,
  PRODUCTS_WE_REPAIR,
  REPAIRER_JOB_SETTING,
  PICKUP_ZONES,
  CONFIG_DOCS,
} from "../../../Utils/Constants";
import { TabImageType } from "../../../CustomTypes";

const tabList = [
  ACCOUNT_SUMMARY,
  CHANGE_DETAILS,
  LOGIN_DETAILS,
  PICKUP_ZONES,
  PRODUCTS_WE_REPAIR,
  REPAIRER_JOB_SETTING,
  CONFIG_DOCS,
];

const tabImages: TabImageType = {
  [ACCOUNT_SUMMARY]: <PersonIcon />,
  [CHANGE_DETAILS]: <ListIcon />,
  [LOGIN_DETAILS]: <LockIcon />,
  [PICKUP_ZONES]: <BagIcon />,
  [PRODUCTS_WE_REPAIR]: <RepairIcon />,
  [REPAIRER_JOB_SETTING]: <CogIcon />,
  [CONFIG_DOCS]: null,
};

const disabledTabs = [CONFIG_DOCS];

const tabs = tabList.map(item => {
  const icon = tabImages[item]
  const labelText = _startCase(item);

  return {
    value: item,
    label: (
      <ImageText
        className="tab-label"
        image={icon}
        text={<Typography variant="h5">{labelText}</Typography>} 
      />
    ),
    disabled: disabledTabs.includes(item),
  }
});

const tabPanels = [
  { value: ACCOUNT_SUMMARY, children: <AccountSummaryTab /> },
  { value: CHANGE_DETAILS, children: <ChangeDetailsTab/> },
  { value: LOGIN_DETAILS, children: <LoginDetailsTab /> },
  { value: PICKUP_ZONES, children: <PickupZonesTab /> },
  { value: PRODUCTS_WE_REPAIR, children: <ProductsTab />},
  { value: REPAIRER_JOB_SETTING, children: <JobSettingTab /> },
  { value: CONFIG_DOCS, children: <div>Docs Tab</div> },
];


const Configure = () => {
  const [selectedTab, setSelectedTab] = useState(ACCOUNT_SUMMARY);

  const onTabChanged = (event: ChangeEvent, currentTab: string) => {
    setSelectedTab(currentTab);
  };

  return (
    <div className="configure-container">
      <Typography variant="h1">Configure</Typography>
      <div className="tab-section">
        <Tabs
          tabList={tabs}
          tabPanelList={tabPanels}
          selectedTab={selectedTab}
          onTabChange={onTabChanged}
        />
      </div>
    </div>
  );
};

export default memo(Configure);
