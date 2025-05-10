import { memo, useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import _startCase from 'lodash/startCase';
import {
  TaskAlt,
  ShoppingCartOutlined as CartIcon,
  WarningAmberOutlined as WarningIcon,
  StoreOutlined as WarehouseIcon,
  PersonOutlineOutlined as PersonIcon,
  AccessTimeOutlined as ClockIcon,
  // Removed Temporarily 
  // FormatListNumberedOutlined as ListIcon,
} from "@mui/icons-material";
import ImageText from "../../../../Common/ImageText";
import { Tabs, Typography } from "../../../../UI";
import CaseDetailTab from "./Partials/CaseDetailTab";
import {
  SUMMARY_TABS,
  DISABLE_SUMMARY,
  CASE_SUMMARY,
  PRODUCT,
  FAULT_PAPERWORK,
  ITEM_LOCATION,
  CUSTOMER,
  TIMING,
  // Removed Temporarily 
  // COMMUNICATION_LOG
} from "../../../../../Utils/Constants";
import { CommonObjType, TabImageType } from "../../../../../CustomTypes";
import { initCaseDetailsTabData } from "../../../../../ActionCreators/CaseAction";
import TimingTab from "./Partials/TimingTab";

const tabImages: TabImageType = {
  [CASE_SUMMARY]: <TaskAlt />,
  [PRODUCT]: <CartIcon />,
  [FAULT_PAPERWORK]: <WarningIcon />,
  [ITEM_LOCATION]: <WarehouseIcon />,
  [CUSTOMER]: <PersonIcon />,
  [TIMING]: <ClockIcon />,
  // Removed Temporarily 
  // [COMMUNICATION_LOG]: <ListIcon />,
};

const tabLabels: CommonObjType = {
  [CASE_SUMMARY]: 'Case Summary',
  [PRODUCT]: 'Product',
  [FAULT_PAPERWORK]: 'Fault / Paperwork',
  [ITEM_LOCATION]: 'Item Location',
  [CUSTOMER]: 'Customer',
  [TIMING]: 'Timing',
  // Removed Temporarily 
  // [COMMUNICATION_LOG]: 'Communication Log',
};

const tabs = SUMMARY_TABS.map(item => {
  const icon = tabImages[item]
  const labelText = tabLabels[item];

  return {
    value: item,
    label: <ImageText className="tab-label" image={icon} text={<Typography variant="h5">{labelText}</Typography>} />,
    disabled: DISABLE_SUMMARY.includes(item)
  }
});

const tabPanels = [
  { value: CASE_SUMMARY, children: <CaseDetailTab tabKey={CASE_SUMMARY} /> },
  { value: PRODUCT, children: <CaseDetailTab tabKey={PRODUCT} /> },
  { value: FAULT_PAPERWORK, children:  <CaseDetailTab tabKey={FAULT_PAPERWORK} /> },
  { value: ITEM_LOCATION, children: <CaseDetailTab tabKey={ITEM_LOCATION} /> },
  { value: CUSTOMER, children: <CaseDetailTab tabKey={CUSTOMER} /> },
  { value: TIMING, children: <TimingTab tabKey={TIMING} /> },
  // Removed Temporarily 
  // { value: COMMUNICATION_LOG, children: <CaseDetailTab tabKey={COMMUNICATION_LOG} /> },
];

const SummaryTab = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const caseId = params.id || '';
  const [selectedTab, setSelectedTab] = useState(CASE_SUMMARY);

  useEffect(() => {
    dispatch(initCaseDetailsTabData(caseId, CASE_SUMMARY));
    setSelectedTab(CASE_SUMMARY);
  }, [caseId]);

  const onTabChanged = (event: ChangeEvent, currentTab: string) => {
    setSelectedTab(currentTab);
    dispatch(initCaseDetailsTabData(caseId, currentTab));

  };

  return (
    <div className="tab-wrapper">
      <Tabs
        tabList={tabs}
        tabPanelList={tabPanels}
        selectedTab={selectedTab}
        onTabChange={onTabChanged}
      />
    </div>
  );
};

export default memo(SummaryTab);
