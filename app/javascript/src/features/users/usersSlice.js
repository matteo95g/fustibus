import { apiAction, standardAction } from "@app/actions";
import UsersApi from "./api";
import produce from "immer";
import { handle } from "redux-pack";
import { ERROR, LOADING, COMPLETE } from "@app/constants";

// Actions
export const LOGIN = "users/LOGIN";
export const FETCH_USER = "users/FETCH_USER";
export const LOGOUT = "users/LOGOUT";

// Action Creators
export const login = (options = {}) => apiAction(LOGIN, UsersApi.login(options));
export const fetchUser = () => apiAction(FETCH_USER, UsersApi.login({}));
export const logout = () => apiAction(LOGOUT, UsersApi.logout());

// Reducer
const initialState = {
  status: null,
  error: null,
  current: {
    user: null,
    included: [],
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { data: json } = payload || {};

  switch (type) {
    case LOGIN:
    case FETCH_USER:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = LOADING;
          });
          return { ...initialState, ...newState };
        },

        success: (prevState) => {
          localStorage.setItem("token", payload.headers.authorization);

          const newState = produce(prevState, (draftState) => {
            draftState.current.user = json.data;
            draftState.current.included = json.included;
            draftState.status = COMPLETE;
          });
          return { ...initialState, ...newState };
        },

        failure: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = ERROR;
            draftState.error = payload.data.error;
          });
          return { ...initialState, ...newState };
        },
      });

    case LOGOUT:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = LOADING;
          });
          return { ...initialState, ...newState };
        },

        success: (prevState) => {
          localStorage.removeItem("token");

          const newState = produce(prevState, (draftState) => {
            draftState.current.user = null;
            draftState.status = COMPLETE;
          });
          return { ...initialState, ...newState };
        },

        failure: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = ERROR;
            draftState.error = payload.data.error;
          });
          return { ...initialState, ...newState };
        },
      });

    default:
      return state;
  }
};

export default reducer;
