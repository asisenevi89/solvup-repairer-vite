import { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _upperCase from "lodash/upperCase";
import _startCase from "lodash/startCase";
import DetailCard from "../../../Common/DetailCard";
import { Typography } from "../../../UI";
import { makeAccountSummary, makeAccountSummaryLoading } from "../../../../Slices/Configuration";
import { initFetchAccountSummary } from "../../../../ActionCreators/Configurations";
import Spinner from "../../../Common/Spinner";

const allCapital = ['abn'];

const AccountSummaryTab = () => {
  const dispatch = useDispatch();
  const isAccountSummaryLoading = useSelector(makeAccountSummaryLoading);
  const accountData = useSelector(makeAccountSummary);
  const {
    user,
    nationwidePickup,
    availability,
    minFee,
    deliveryNote,
    advertiseMessage,
    ...accountSummary
  } = accountData;

  useEffect(() => {
    dispatch(initFetchAccountSummary())
  }, []);

  
  const accountDetails = Object.keys(accountSummary).map((key) => (
    {
      dataKey: allCapital.includes(key) ? _upperCase(key) : _startCase(key),
      dataValue: accountSummary[key as keyof typeof accountSummary],
    }
  ));

  return (
    <Spinner backdropProps={{ open: isAccountSummaryLoading}}>
      <div className="account-summary-tab">
        <Typography variant="h2">{accountSummary.repairerName}</Typography>
        <DetailCard details={accountDetails} />
      </div>
    </Spinner>
  );
};

export default memo(AccountSummaryTab);
