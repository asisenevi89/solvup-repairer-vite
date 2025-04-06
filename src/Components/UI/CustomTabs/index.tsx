import { memo, ReactNode, ReactElement, useState, useEffect } from 'react';
import Tab, { TabProps } from '@mui/material/Tab';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import Box from '@mui/material/Box';

export interface TabItem extends TabProps {
  label: string | ReactNode;
  disabled?: boolean;
}

export interface TabPanelItem {
  value: string | number;
  children: ReactElement;
}

export interface CustomTabsProps extends TabsProps {
  selectedTab?: string | number;
  tabList: TabItem[];
  tabPanelList: TabPanelItem[];
  onTabChange?: (event: any, currentTab: string) => void;
  wrapperClass?: string,
}

interface TabPanelProps {
  children?: ReactNode;
  panelKey: string | number;
  selectedTabValue: string | number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, selectedTabValue, panelKey, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={selectedTabValue !== panelKey}
      aria-labelledby={`simple-tab-${panelKey}`}
      {...other}
    >
      {selectedTabValue === panelKey && (
        <Box sx={{ p: 1 }}>{children}</Box>
      )}
    </div>
  );
};

const CustomTabs = ({
  selectedTab,
  tabList,
  onTabChange,
  tabPanelList,
  wrapperClass,
  ...restTabsProps
}: CustomTabsProps) => { 

  const [currentTab, setCurrentTab] = useState(tabList[0].value);

  useEffect(() => {
    if (!selectedTab) return;

    setCurrentTab(selectedTab);
  }, [selectedTab]);

  const onSelectionChange = (event: any, newTab: string) => {
    setCurrentTab(newTab);

    if (onTabChange) {
      onTabChange(event, newTab)
    }
  }

  return (
    <div className={wrapperClass}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '25px' }}>
          <Tabs
            value={currentTab}
            onChange={onSelectionChange}
            scrollButtons='auto'
            variant='scrollable'
            {...restTabsProps}
          >
            {tabList.map((tabItem: TabItem) => {
              const { key, value, ...restTabProps } = tabItem;
              return (
                <Tab
                  key={`${value}-tab`}
                  value={value}
                  {...restTabProps}
                />
              );
            })}
          </Tabs>
        </Box>
        {tabPanelList.map((panelItem: TabPanelItem) => {
          const { value: panelValue, children } = panelItem;

          return (
            <CustomTabPanel
              key={panelValue}
              panelKey={panelValue}
              selectedTabValue={currentTab}
            >
              {children}
            </CustomTabPanel>
          );
        })}
      </Box>
    </div>
  );
}

export default memo(CustomTabs);
