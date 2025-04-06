import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { makeAnnouncementList, makeAnnouncementListLoading } from "../../../../Slices/CaseList";
import AnnouncementContent from "./AnnouncementContent";
import { IconButton, Carousel, Typography } from "../../../UI";
import Announcement from "../../../Common/Announcement";
import { AnnouncementType } from "../../../../CustomTypes";
import Spinner from "../../../Common/Spinner";
import LeftIcon from '@mui/icons-material/ChevronLeft';
import RightIcon from '@mui/icons-material/ChevronRight';

const AnnouncementList = () => {
  const announcements = useSelector(makeAnnouncementList);
  const loading = useSelector(makeAnnouncementListLoading);
  const [isExpanded, setExpanded] = useState(false);
  
  const renderItem = (item: AnnouncementType) => (
    <Announcement
      key={item.id}
      heading={(
        <Typography variant="h1" wrapper={false} className="header-text">
          {item.title}
        </Typography>
      )}
      content={<AnnouncementContent content={item.content} header={item.header} />}
      className="top-announcement"
      isExpanded={isExpanded}
      passExpanded={value => setExpanded(value)}
    />
  )

  const RenderNextBtn = (btnProp: any) => {
    const { onClick } = btnProp;

    return (
      <div className="carousel-btn-wrapper next">
        <IconButton onClick={onClick}>
          <RightIcon />
        </IconButton>
      </div>
    )
  };

  const RenderPrevBtn = (btnProp: any) => {
    const { onClick } = btnProp;

    return (
      <div className="carousel-btn-wrapper prev">
        <IconButton onClick={onClick}>
          <LeftIcon />
        </IconButton>
      </div>
    )
  }

  return (
    <Spinner backdropProps={{ open: loading}}>
      <Carousel
        infinite={false}
        autoplay={false}
        dots={true}
        dotsClass="carousel-bottom-navigation"
        className={`custom-carousel ${isExpanded ? 'expanded' : 'collapsed'}`}
        nextArrow={<RenderNextBtn />}
        prevArrow={<RenderPrevBtn />}
      >
        {announcements.map(item => renderItem(item))}
      </Carousel>
    </Spinner>
  );
};

export default memo(AnnouncementList);
