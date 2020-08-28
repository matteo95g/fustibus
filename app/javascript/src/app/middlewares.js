import history from "./history";
import { loginUrl } from "@utils/app/urlHelpers";
import { LOGIN, logout } from "@features/users/usersSlice";

const UNAUTHORIZED_STATUS = 401;

export const unauthorizeHandler = (store) => (next) => (action) => {
  const httpStatus = action.payload?.status;
  const isLogin = action.type === LOGIN;
  const errorKey = action.payload?.data?.errorKey;

  if (httpStatus === UNAUTHORIZED_STATUS) {
    if (errorKey === "expired_token") {
      store.dispatch(logout());
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
