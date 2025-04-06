import { LoginType } from "../CustomTypes";
import { 
  INIT_USER_LOGIN,
} from "./ActionTypes";

const dataUrl = import.meta.env.VITE_SOLVUP_BACKEND_URL;

export const initLogin = (data: LoginType) => {
  const url = `${dataUrl}/auth`;

  return {
    type: INIT_USER_LOGIN,
    url,
    data,
  };
};