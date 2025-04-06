import { memo, ReactElement, useEffect } from "react";
import { isUserLogged } from "../../../Utils/Helpers";
import { useNavigate } from "react-router";

export interface SecureRouteProps {
  children: ReactElement,
};

const SecureRoute = (props: SecureRouteProps) => {
  const navigate = useNavigate();
  const { children } = props;

  useEffect(() => {
    if (!isUserLogged()) {
      navigate('/');
    }
  }, []);

  return <>{children}</>
};

export default memo(SecureRoute);