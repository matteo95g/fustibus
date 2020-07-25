import history from './history';
import { loginUrl } from "@utils/app/urlHelpers";
import { LOGIN } from "@features/users/usersSlice";

const UNAUTHORIZED_STATUS = 401;

export const unauthorizeHandler = () => next => action => {
  const httpStatus = action.payload?.status;
  const isLogin = action.type === LOGIN;
  const errorKey = action.payload?.data?.errorKey;

  if (httpStatus === UNAUTHORIZED_STATUS) {
    if (errorKey === "expired_token") {
      window.localStorage.removeItem("token");
    }

    if (!isLogin) {
      history.push(loginUrl());
    } else {
      next(action);
    }
  } else {
    next(action);
  }
};
