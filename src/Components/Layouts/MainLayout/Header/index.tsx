import {
  useState,
  useEffect,
  memo,
  MouseEvent,
  ChangeEvent,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import _get from 'lodash/get';
import {
  AppBar,
  Grid,
  Link,
  Typography,
  Chip,
  Avatar,
  Popover,
  TextField,
  Button,
} from "../../../UI";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import PowerIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from "@mui/icons-material/Search";
import { makeUserData, setLastSuccessLogin } from "../../../../Slices/User";
import {
  makeSelectedJob,
  makeSelectedJobLoading,
} from "../../../../Slices/CaseAction";
import { makeJobListLoading } from "../../../../Slices/CaseList";
import { clearUserSession, isUserLogged, getFullName } from "../../../../Utils/Helpers";
import { LayoutLinkType, JobType } from "../../../../CustomTypes";
import ImageText from "../../../Common/ImageText";
import WhiteLogo from '../../../../Assets/images/whiteLogo.png';
import './styles.scss';

const commonLinks: LayoutLinkType[] = [
  {
    key: 'helpAndSupport',
    text: 'Help and Support',
    icon: <HelpOutlineIcon className="header-icon" />
  }
];

const repairerAction = '/repairer-action';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userData = useSelector(makeUserData);
  const fullName = getFullName();
  const hasUserSession = isUserLogged();
  const path = location.pathname;

  const selectedJob: JobType | {} = useSelector(makeSelectedJob);
  const selectedJobLoading = useSelector(makeSelectedJobLoading);
  const jobsLoading  = useSelector(makeJobListLoading);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [enteredId, setEnteredId] = useState('');

  const popOpen = Boolean(anchorEl);
  const popId = popOpen ? 'pop-chip' : undefined;

  useEffect(() => {
    const selectedId = _get(selectedJob, 'id', '');
    setEnteredId(selectedId);
  }, [JSON.stringify(selectedJob)]);

  useEffect(() => {
    if (!path.includes(repairerAction)) {
      setEnteredId('');
    }
  }, [path])

  const onChipClicked = (event: MouseEvent<any>) => {
    
    setAnchorEl(event.currentTarget)
  };

  const onPopClose = () => {
    setAnchorEl(null);
  };

  const onClickLink = (key: string) => {
    if (key === 'logout') {
      clearUserSession();
      dispatch(setLastSuccessLogin(0));
      navigate('/');
    }
  };

  const getAvatar = () => {
    const image = _get(userData, 'image', '');

    if (image) {
      return <Avatar className="person-icon" src={image} alt="User Image" />;
    }

    return (
      <Avatar className="person-icon" src="User Icon" sizes="">
        <PersonIcon fontSize="large" />
      </Avatar>
    );
  };

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEnteredId(value);
  };

  const onSearchJobId = () => {
    navigate(`/repairer-action/${enteredId}`);
  };

  return (
    <AppBar wrapperClass="layout-app-bar" >
      <div className="left-content">
        <div className="header-logo">
          <a href={hasUserSession ? '/repairer-list' : '/' }>
            <img
              className="header-icon"
              src={WhiteLogo} alt="logo"
              width={162}
              height={50}
            />
          </a>
        </div>
        {hasUserSession && (
          <div className="search-wrapper">
            <TextField
              className="search-field"
              placeholder="Enter Case Number"
              label={null}
              type="Outlined"
              value={enteredId}
              onChange={handleIdChange}
              disabled={jobsLoading || selectedJobLoading}
              slotProps={{
                input: {
                  endAdornment: (
                    <Button
                      wrapper={false}
                      wrapperClass="search-btn"
                      variant="contained" 
                      color="primary"
                      onClick={onSearchJobId}
                    >
                      {<SearchIcon fontSize="large" />}
                    </Button>
                  )
                }
              }}
            />
          </div>
        )}
      </div>
      <Grid container spacing={3}>
        {commonLinks.map(link => (
          <Grid key={link.key} size={12}>
            <Link href="" onClick={() => onClickLink(link.key)} className="support-links">
              <ImageText
                className="app-bar-item"
                text={
                  <Typography variant="h3">{link.text}</Typography>
                }
                image={link.icon}
              />
            </Link>
          </Grid>
        ))}
        {hasUserSession && (
          <Grid size={12}>
            <Chip
              aria-describedby={popId}
              className="logout-chip"
              avatar={getAvatar()}
              label={
                <div className="content">
                  <Typography variant="h3">
                    {`${fullName}`}
                  </Typography>
                  <ArrowDownIcon className="dropdown-icon" />
                </div>
              }
              onClick={onChipClicked}
            />
            <Popover
              open={popOpen}
              id={popId}
              anchorEl={anchorEl}
              onClose={onPopClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              className="app-bar-popover"
            >
              <div className="logout-link">
                <Link href="" onClick={() => onClickLink('logout')}>
                  <ImageText
                    className="app-bar-item"
                    text={
                      <Typography variant="h5">Logout</Typography>
                    }
                    image={<PowerIcon className="header-icon" />}
                  />
                </Link>
              </div>
            </Popover>
          </Grid>
        )}
      </Grid>
    </AppBar>
  );
};

export default memo(Header);
