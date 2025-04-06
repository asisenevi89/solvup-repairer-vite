import { memo } from "react";
import { AnnouncementContentType } from "../../../../CustomTypes";

type AnnouncementContentProps = {
  content: AnnouncementContentType[];
  header: string;
}
const AnnouncementContent = ({
  content,
  header,
}: AnnouncementContentProps) => (
  <>
    <span className="header">{header}</span><br /><br />
    {content.map((item, index) => {
      const { subHeader, textLines } = item;
      return(
        <div className="announcement-content" key={`announce-content-${index}`}>
          {subHeader && <><strong className="subHeader">{subHeader}</strong><br /> <br /></>}
          {textLines.map((line, index) => (
            <div key={`announce-content-line-${index}`}>
              <span>{line}</span>
              <br />
            </div>
          ))}
          <br />
          <br />
        </div>
      );
    })}
  </>
);

export default memo(AnnouncementContent);
