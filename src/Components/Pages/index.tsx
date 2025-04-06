import { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { makeLastSuccessLogin, makeRepairerLoading } from '../../Slices/User';
import LoginForm from '../Forms/LoginForm';
import Spinner from '../Common/Spinner';
import { Link, Typography } from '../UI';
import './styles.scss';
import {
  LEARN_MORE_LINK,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  PRIVACY_POLICY_LINK,
  TERMS_OF_SERVICE_LINK
} from '../../Utils/Constants';
import { isUserLogged } from '../../Utils/Helpers';
import { setNetworkError } from '../../Slices/General';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lastSuccessLogging = useSelector(makeLastSuccessLogin);
  const userLoading = useSelector(makeRepairerLoading);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (params.has('sessionExpired') && params.get('sessionExpired') === 'true') {
      dispatch(setNetworkError('Session Expired. Please Login Again'));
      navigate(location.pathname, { replace: true });
      return
    }

    if (isUserLogged()) {
      navigate('/repairer-list');
    }
  }, []);

  useEffect(() => {
    if (!lastSuccessLogging) return;

    navigate('/repairer-list');
  }, [lastSuccessLogging]);
  
  return (
    <Spinner backdropProps={{ open: userLoading }}>
      <div className='home-container'>
        <div className='description'>
          <div>
            <Typography variant='h1' marginBottom="20px">
              Welcome to Solvup!
            </Typography>
            <Typography>
              The Solvup Authorized User Portal is your one-stop platform for 
              handling post-purchase services.From tracking repair status to
              processing product returns, Solvup ensures a consistent, compliant,
              and efficient experience across multiple return channels whether in-store,
              online, or through customer service centers. Use your credentials to
              access real-time data, submit updates, and collaborate with suppliers
              and repairers, all from a central hub.
            </Typography>
            <Link href={LEARN_MORE_LINK}>Learn More</Link>
          </div>
          <div className='help-section'>
            <Typography variant='h5'>Need Help?</Typography>
            <Typography className='details'>
              For support, contact our team at &nbsp;
              <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link> &nbsp; or call &nbsp;
              <Link href={`tel:${SUPPORT_PHONE}`}>{SUPPORT_PHONE}</Link>
            </Typography>
          </div>
          <div className='policy-section'>
            <Typography variant='h5'>Privacy Policy and Terms:</Typography>
            <Typography>
              By logging in, you agree to Solvup's &nbsp;
              <Link href={PRIVACY_POLICY_LINK}>Privacy Policy</Link> &nbsp; and &nbsp;
              <Link href={TERMS_OF_SERVICE_LINK}>Terms of Service</Link>
            </Typography>
          </div>
        </div>
        <LoginForm />
      </div>
    </Spinner>
    
  );
}

export default memo(Home);
