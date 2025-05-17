// Temporary file for the TimingTab component. This will be replaced with the actual implementation later.

import { memo } from "react";
import _get from "lodash/get";
import { Link, TextField, Typography } from "../../../../../UI";
import DetailCard from "../../../../../Common/DetailCard";
import { CaseDetailTabItem } from "../../../../../../CustomTypes";

const fields: CaseDetailTabItem[] = [{
  id: 11,
  name: "totalTime",
  label: "Total Time Since Claim Raised",
  value: "5 days",
  type: "label",
  theme: {},
  editable: false,
  toolTipText: ""
}];


const CaseDetailTab = () => {
  

  const getFieldComponent = (field: CaseDetailTabItem) => {
    const { value, editable, theme } = field;
    switch (field.type) {
      case 'label':
        return <Typography sx={{...theme}}>{value}</Typography>;
      case 'link':
        return (
          <Link
            className="case-detail-link"
            href={value}
            target="__blank" sx={{...theme}}
          >
            Click Here
          </Link>
        );
      case 'text':
        return <TextField sx={{...theme}} disabled={!editable}>{value}</TextField>
      default:
        return <Typography sx={{...theme}}>{value}</Typography>;
    }
  };

  const getDetailCardData = () => (
    fields.map(field => (
      {
        dataKey: field.label,
        dataValue: getFieldComponent(field),
      } 
    ))
  );

  return (
    <div className="tab-content">
      <Typography variant="h3">Time Details</Typography>
      <DetailCard  details={getDetailCardData()}/>
    </div>
  );
};

export default memo(CaseDetailTab);
