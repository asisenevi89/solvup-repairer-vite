import { memo, ReactNode} from 'react';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import AccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface AccordionItem extends AccordionProps {
  summary: ReactNode,
  details: ReactNode,
  expandIcon?: ReactNode,
  summaryProps?: AccordionSummaryProps,
  detailsProps?: AccordionDetailsProps,
};

export interface CustomAccordionProps {
  wrapperClass?: string,
  items: AccordionItem[],
};

const accordionKey = 'custom_accordion';
const defaultIcon = <ArrowDropDownIcon />

const CustomAccordion = (props: CustomAccordionProps) => {
  const { wrapperClass, items } = props;

  return (
    <div className={wrapperClass}>
      {items.map((item, index) => {
        const {
          summary,
          details,
          expandIcon,
          summaryProps,
          detailsProps,
          ...restProps 
        } = item;

        return (
          <Accordion key={`${accordionKey}_${index}`} {...restProps}>
            <AccordionSummary
              expandIcon={item.expandIcon || defaultIcon}
              {...(item.summaryProps || {})}
            >
              {item.summary}
            </AccordionSummary>
            <AccordionDetails className='custom-accordian-detail' {...item.detailsProps}>
              {item.details}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default memo(CustomAccordion);
