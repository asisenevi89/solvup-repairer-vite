import { memo, ReactNode, useEffect, useState } from "react";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from "@mui/icons-material/Add";
import { Accordion, Typography } from "../../UI";
import './styles.scss';

type AnnouncementType = {
  heading?: ReactNode,
  headerIcon?: ReactNode,
  content: ReactNode,
  className?: string,
  isExpanded?: boolean
  passExpanded?: (value: boolean) => void
}

const defaultHeading = (
  <Typography
    wrapper={false}
    variant="h1"
    className="header-text"
  >
    Announcement
  </Typography>
);

const defaultHeadIcon = <AnnouncementIcon className="header-icon" fontSize="large"/>

const Announcement = (props: AnnouncementType) => {
  const {
    heading = defaultHeading,
    headerIcon = defaultHeadIcon,
    content,
    className,
    isExpanded = false,
    passExpanded = () => {}
  } = props;

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  const getSummary = () => (
    <div className={`header-section ${expanded ? 'expanded' : ''}`}>
      <div className="anncounce-icon-cover">{headerIcon}</div>
      {heading}
    </div>
  );

  const getExpandIcon = () => (
    <div className={`expand-section ${expanded ? 'expanded' : ''}`}>
      <Typography wrapper={false} className="expand-text">
        {expanded ? 'Hide Announcement' : 'Show Announcement'}
      </Typography>
      { expanded 
        ? <ClearIcon fontSize="large" className="close-icon"/>
        : <AddIcon fontSize="large" className="close-icon" />
      }
    </div>
  );

  const onExpand = () => {
    setExpanded(!expanded);
    passExpanded(!expanded)
  };

  return (
    <Accordion
      wrapperClass={`announcement-parent ${className}`}
      items={[
        {
          summary: getSummary(),
          expandIcon: getExpandIcon(),
          details: content,
          expanded,
          onChange: onExpand,
          children: ""
        }
      ]}
    />
  )
};

export default memo(Announcement);
