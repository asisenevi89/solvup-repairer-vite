import { useState, memo, ChangeEvent } from "react";
import _startCase from 'lodash/startCase';
import {
  Bolt as BoltIcon,
  Slideshow as SlideIcon,
  SmsOutlined as SmsIcon,
  ReportProblemOutlined as WarningIcon,
  BookOutlined as PhoneIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { Tabs, Typography } from "../../../../UI";
import ImageText from "../../../../Common/ImageText";
import NextActionTab from "./Partials/NextActionTab";
import EscalationTab from "./Partials/EscalationTab";
import NotesTab from "./Partials/NotesTab";
import {
  NEXT_ACTION,
  NOTES,
  ESCALATION,
  CONTACT_CUSTOMER,
  CUSTOMER_DISPATCH_DATE,
  DISABLE_ACTIONS,
  ACTION_TABS,
} from "../../../../../Utils/Constants";
import { TabImageType } from "../../../../../CustomTypes";

const tabImages: TabImageType = {
  [NEXT_ACTION]: <SlideIcon />,
  [NOTES]: <SmsIcon />,
  [ESCALATION]: <WarningIcon />,
  [CONTACT_CUSTOMER]: <PhoneIcon />,
  [CUSTOMER_DISPATCH_DATE]: <CalendarIcon />,
};

const tabs = ACTION_TABS.map(item => {
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
    disabled: DISABLE_ACTIONS.includes(item)
  }
});

const tabPanels = [
  { value: NEXT_ACTION, children: <NextActionTab /> },
  { value: NOTES, children: <NotesTab /> },
  { value: ESCALATION, children: <EscalationTab /> },
  { value: CONTACT_CUSTOMER, children: <div>Customer Tab</div> },
  { value: CUSTOMER_DISPATCH_DATE, children: <div>Dispatch Tab</div> },
];

const ActionTabs = () => {

  const [selectedTab, setSelectedTab] = useState(NEXT_ACTION);

  const onTabChanged = (event: ChangeEvent, currentTab: string) => {
    setSelectedTab(currentTab);
  };

  return (
    <div className="action-tab-wrapper">
      <ImageText
        className="notes-heading"
        image={<BoltIcon className="notes-icon"/>}
        text={<Typography variant="h2">Actions</Typography>}
      />
      <div className="tab-wrapper">
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

export default memo(ActionTabs);
