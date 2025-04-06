import { memo, ReactNode } from "react";
import { Card, Table, Typography } from "../../UI";
import { TableRowDataType } from "../../../CustomTypes";
import './styles.scss'

type DetailCardDatumType = { 
  dataKey: string,
  dataValue: ReactNode,
}

type DetailCardType = {
  details: DetailCardDatumType[]
  className?: string,
  header?: ReactNode,
}


const DetailCard = (props: DetailCardType) => {
  const {
    details, 
    className = ''
  } = props;

  const cellRenders = (value: TableRowDataType, column: string) => {
    if (column === 'dataKey') {
      return (
        <Typography wrapper={false} variant="body1">
         <b>{value}</b> 
        </Typography>
      )
    }
    return value;
  };

  return (
    <Card wrapperClass={`detail-card-parent ${className}`} >
      <Table 
        data={details}
        headers={[]}
        isStripped
        cellRenderer={cellRenders}
        rowUniqueIdKey=""
      />
    </Card>
  );
};

export default memo(DetailCard);
