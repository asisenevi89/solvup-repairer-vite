import { memo } from "react";
import { Typography } from "../../../../../UI";

const ResponseAwaitedForm = () => (
  <div className="tab-form">
    <div className="header-section">
      <Typography variant="h3">Response Awaited</Typography>
    </div>
    <div className="info-section ">
      <Typography variant="h4">
        We are waiting a response from SquareTrade.
      </Typography>
    </div>
  </div>
);

export default memo(ResponseAwaitedForm);
