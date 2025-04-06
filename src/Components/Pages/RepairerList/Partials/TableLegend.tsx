import { memo } from "react";
import { Grid, Typography} from "../../../UI";
import { InfoOutlined } from "@mui/icons-material";
import { TABLE_BLUE_MSG, TABLE_RED_MSG, TABLE_ORANGE_MSG } from "../../../../Utils/Constants";

const TableLegend = () => (
  <Grid container wrapper={false} size={10} className="legend">
    <Grid wrapper={false} size={0.5}>
      <InfoOutlined fontSize="large" className="info-icon" />
    </Grid>
    <Grid wrapper={false} size={7.5}>
      <Typography className="legend-text">
        <span className="blue-warning"></span>
        {TABLE_BLUE_MSG}
      </Typography>
      <Typography className="legend-text">
        <span className="red-warning"></span>
        {TABLE_RED_MSG}
      </Typography>
      <Typography className="legend-text">
        <span className="orange-warning"></span>
        {TABLE_ORANGE_MSG}
      </Typography>
    </Grid>
  </Grid>
);

export default memo(TableLegend);
