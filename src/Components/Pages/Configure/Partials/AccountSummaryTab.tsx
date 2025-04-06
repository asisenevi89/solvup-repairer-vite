import { memo } from "react";
import _upperCase from "lodash/upperCase";
import DetailCard from "../../../Common/DetailCard";
import { Typography } from "../../../UI";
import { getRepairerData } from "../../../../Utils/Helpers";

const unknown  = 'UNKNOWN';

const AccountSummaryTab = () => {
  const accountData = getRepairerData();
  const {
    abn,
    address,
    retailerSupportLine,
    customerSupportLine,
    email,
    name,
    suburb,
    state,
    postcode,
  } = accountData;
  const cardDetails = [
    { dataKey: 'ABN', dataValue: abn },
    { dataKey: 'Street Address', dataValue: address },
    { dataKey: 'Suburb', dataValue: suburb },
    { dataKey: 'State', dataValue: _upperCase(state) },
    { dataKey: 'Postal Code', dataValue: postcode },
    { dataKey: 'Retailer Support Line', dataValue: retailerSupportLine },
    { dataKey: 'Customer Support Line', dataValue: customerSupportLine || unknown },
    { dataKey: 'Contact Email', dataValue: email },
  ];

  return (
    <div className="account-summary-tab">
      <Typography variant="h2">{name}</Typography>
      <DetailCard details={cardDetails} />
    </div>
  );
};

export default memo(AccountSummaryTab);
