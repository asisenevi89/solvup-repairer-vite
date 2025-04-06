import { ReactNode, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import LeftPanel from "./LeftPanel";
import { Notification } from "../../UI";
import {
  clearNetworkErrors,
  clearDataSaves,
  makeNetworkErrors,
  makeSuccessSaves,
} from "../../../Slices/General";
import './styles.scss';

export interface LayoutProps {
  children: ReactNode
}

const MainLayout = (props: LayoutProps) => {
  const errors = useSelector(makeNetworkErrors);
  const saves = useSelector(makeSuccessSaves);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!saves.length) return;

    setTimeout(() => {
      dispatch(clearDataSaves());
    }, 5000);
  }, [JSON.stringify(saves)]);

  useEffect(() => {
    if (!errors.length) return;

    setTimeout(() => {
      dispatch(clearNetworkErrors());
    }, 5000);
  }, [JSON.stringify(errors)]);
  
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="layout-content" >
        <LeftPanel />
        <div className="layout-child">
          {props.children}
        </div> 
      </div>
      {saves.map(save => (
        <Notification key={save} open type="success" message={save} />
      ))}
      {errors.map(save => (
        <Notification key={save} open type="error" message={save} />
      ))}
    </div>
  )
}

export default memo(MainLayout);
