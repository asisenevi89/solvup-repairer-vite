import { ChangeEvent, memo, useState } from "react";
import { Tabs, Typography } from "../../../../UI";
import InWarrantyTab from "./InWarantyTab";
import OutWarrantyTab from "./OutWarrantyTab";

const inTab = 'inWarrantyRepairs';
const outTab = 'outOfnWarrantyRepairs';

const tabList = [
  { value: inTab, label: 'In Warranty Repairs' },
  { value: outTab, label: 'Out-of-Warranty Repairs' },
];

const tabs = tabList.map(item => (
  {
    value: item.value,
    label: (
        <Typography  variant="h3">
        {item.label}
      </Typography>
    ),
  }
));

const ProductsTab = () => {
  const [selectedTab, setSelectedTab] = useState(inTab);
  const tabPanelList = [
    { value: inTab, children: <InWarrantyTab /> },
    { value: outTab, children: <OutWarrantyTab /> },
  ];

  const onTabChanged = (_event: ChangeEvent, currentTab: string) => {
    setSelectedTab(currentTab);
  };
  
  return (
    <div className="product-tab">
      <Tabs
        wrapperClass="tab-view"
        tabList={tabs}
        tabPanelList={tabPanelList}
        selectedTab={selectedTab}
        onTabChange={onTabChanged}
      />
    </div>
  );
}

export default memo(ProductsTab);
