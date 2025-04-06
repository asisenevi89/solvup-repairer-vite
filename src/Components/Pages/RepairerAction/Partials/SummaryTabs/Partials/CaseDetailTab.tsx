import { memo } from "react";
import { useSelector } from "react-redux";
import _get from "lodash/get";
import { Link, TextField, Typography } from "../../../../../UI";
import DetailCard from "../../../../../Common/DetailCard";
import { CaseDetailState, makeCaseTabData, makeCaseTabDataLoading } from "../../../../../../Slices/CaseAction";
import { CaseDetailTabItem } from "../../../../../../CustomTypes";
import Spinner from "../../../../../Common/Spinner";

type CaseDetailTabProps = {
  tabKey: string;
};


const CaseDetailTab = ({
  tabKey
}: CaseDetailTabProps) => {
  const caseDetails = useSelector((state: CaseDetailState) => makeCaseTabData(state, tabKey));
  const isTabLoading = useSelector(makeCaseTabDataLoading);
  const title = _get(caseDetails, 'title', '');
  const fields = _get(caseDetails, 'fields', []);

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
      <Spinner backdropProps={{open: isTabLoading}}>
        <Typography variant="h3">{title}</Typography>
        <DetailCard  details={getDetailCardData()}/>
      </Spinner>
    </div>
  );
};

export default memo(CaseDetailTab);
