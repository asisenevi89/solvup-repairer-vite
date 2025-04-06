import { memo } from "react";
import { Typography } from "../../../../UI";
import { cellAge } from "../../../../../Utils/Helpers";
import { JobType } from "../../../../../CustomTypes";

type JobCardType = {
  job: JobType,
};

const JobCard = (props: JobCardType) => {
  const { job } = props;
  const {
    id,
    productName: product,
    brandName:brand,
    created: date,
    storeName: store
  } = job;

  return (
    <>
      <Typography variant="h4" className="job-heading">
        Case ID: <span className="no-bold">{id}</span>
      </Typography>
      <Typography className="job-product" variant="h4">{product}</Typography>
      <div className="job-details">
        <Typography wrapper={false}>
          <strong>Brand:&nbsp;</strong>
          {brand}
        </Typography>
        <Typography wrapper={false}>
          <strong>Age:&nbsp;</strong>
          {cellAge(date)}
        </Typography>
        <Typography wrapper={false}>
          <strong>Store:&nbsp;</strong>
          {store}
        </Typography>
      </div>
    </> 
  );
};

export default memo(JobCard);
