import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _get from "lodash/get";
import {
  setSelectedJob,
  makeSelectedJob,
  makeSelectedJobLoading,
} from "../../../../Slices/CaseAction";
import {
  setSelectedJobStatus,
  makeJobList,
  makeJobListLoading,
} from "../../../../Slices/CaseList";
import { fetchCaseList } from "../../../../ActionCreators/CaseList";
import { Typography, IconButton } from "../../../UI";
import BasicList from "../../../UI/CustomBasicList";
import Spinner from "../../../Common/Spinner";
import ListIcon from '@mui/icons-material/FormatListBulleted';
import InfoIcon from "@mui/icons-material/InfoOutlined";
import BuildIcon from '@mui/icons-material/BuildOutlined';
import LeftIcon from '@mui/icons-material/ChevronLeft';
import RightIcon from '@mui/icons-material/ChevronRight';
import JobCard from "./Partials/JobCard";
import { COLUMN_ID, PUBLIC_ROUTES } from "../../../../Utils/Constants";
import { JobListFetchType, JobType, ListValueType } from "../../../../CustomTypes";

import './styles.scss';

const repairerList = '/repairer-list';
const repairerAction = '/repairer-action';
const configure = '/configure';

const noCustomContent = [configure, repairerList];

const fetchParams: JobListFetchType = {
  size: 10,
  page: 0,
  order: 'asc',
  orderBy: COLUMN_ID
}

const LeftPanel = () => {
  const repairerListRoute =  { 
    value: repairerList,
    primaryText: <Typography variant="h4">List Cases</Typography>, 
    icon: <ListIcon fontSize="large"/>
  };
  const repairerActionRoute = {
    value: repairerAction,
    primaryText: <Typography variant="h4">Case View</Typography>,
    icon: <InfoIcon fontSize="large" />,
  };
  const configureRoute = {
    value: configure,
    primaryText: <Typography variant="h4">Configure</Typography>,
    icon: <BuildIcon fontSize="large" />
  }

  const mainItems = [repairerListRoute, configureRoute];
  const actionItems = [repairerListRoute, repairerActionRoute, configureRoute];

  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jobsLoading  = useSelector(makeJobListLoading);
  const selectedJob: JobType | {} = useSelector(makeSelectedJob);
  const selectedJobLoading = useSelector(makeSelectedJobLoading);
  const jobList = useSelector(makeJobList);

  const [selectedItem, setSelectedItem] = useState<ListValueType>('');
  const [isExpand, setIsExpand] = useState(true);

  const repairJobs: JobType[] = jobList.records;
  const listItems = path.includes(repairerAction) ? actionItems : mainItems;

  useEffect(() => {
    if (!jobList.records.length && !PUBLIC_ROUTES.includes(path)) {
      dispatch(fetchCaseList(fetchParams))
    }
  }, []);

  useEffect(() => {
    const found = listItems.find(item => path.includes(item.value));

    if (!path.includes(repairerAction)) {
      dispatch(setSelectedJobStatus([]));
    }

    if (path.includes(repairerAction)) {
      setIsExpand(true);
    }

    if (found) {
      setSelectedItem(found.value);
      return;
    }
    setSelectedItem('');
  }, [path]);

  const onSelectItem = (value: ListValueType) => {
    const valueStr = value.toString();

    if (selectedItem === valueStr) return;

    setSelectedItem(valueStr);
    navigate(valueStr);
    dispatch(setSelectedJob({}));

    if (!valueStr.includes(repairerAction)) {
      dispatch(setSelectedJobStatus([]));
    }
  };

  const getJobList = () => (
    repairJobs.map(job => (
      {
        value: job.id,
        primaryText: (<JobCard job={job} />),
        disabled: jobsLoading,
      }
    ))
  );

  const onSelectRepairJob = (value: ListValueType) => {
    const valueStr = value.toString();
    navigate(`${repairerAction}/${valueStr}`);
  };

  const onChangeExpand = () => {
    setIsExpand(!isExpand);
  };

  const getCustomContent = () => {
    if (noCustomContent.includes(selectedItem.toString())) {
      return null;
    }

    if (selectedItem === repairerAction) {
      return (
        <div className={`custom-content job-menu`}>
          <Spinner backdropProps={{ open: jobsLoading || selectedJobLoading}}>
            <BasicList
              wrapperClass="job-menu-list"
              listItems={getJobList()}
              selectedValues={[_get(selectedJob, 'id', '')]}
              onSelectItem={onSelectRepairJob}
            />
          </Spinner>
        </div>
      );
    }
  }

  if (PUBLIC_ROUTES.includes(path)) return null;
  
  return (
    <div className={`left-navigation ${isExpand ? '' : 'collapsed'}`}>
      <BasicList
        wrapperClass="layout-menu"
        listItems={listItems}
        selectedValues={[selectedItem]}
        onSelectItem={onSelectItem}
      />
      {getCustomContent()}
      {noCustomContent.includes(selectedItem.toString()) && (
        <IconButton
          className={`expand-btn ${isExpand ? 'expanded' : ''} `} 
          onClick={onChangeExpand}
        >
          {isExpand ? 
            <LeftIcon className="expand-icon left" /> :
            <RightIcon className="expand-icon right" />
          }
        </IconButton>
      )}
    </div>
  );
};

export default memo(LeftPanel);
