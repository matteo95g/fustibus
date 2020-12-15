import { apiAction, standardAction } from "@app/actions";
import UsersApi from "./api";
import produce from "immer";
import { handle } from "redux-pack";
import { ERROR, LOADING, COMPLETE } from "@app/constants";

// Actions
export const LOGIN = "users/LOGIN";
export const FETCH_USER = "users/FETCH_USER";
export const SIGNUP = "users/SIGNUP";
export const LOGOUT = "users/LOGOUT";
export const UPDATE = "users/UPDATE";

// Action Creators
export const login = (options = {}) => apiAction(LOGIN, UsersApi.login(options));
export const fetchUser = () => apiAction(FETCH_USER, UsersApi.login({}));
export const signup = (options = {}) => apiAction(SIGNUP, UsersApi.signup(options));
export const logout = () => apiAction(LOGOUT, UsersApi.logout());
export const update = (id, attributes) => apiAction(UPDATE, UsersApi.update(id, attributes));

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
            draftState.current.included = json.included ?? [];
            draftState.status = COMPLETE;
            draftState.error = null;
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

    case SIGNUP:
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
            if (json.included) draftState.current.included = json.included;
            draftState.status = COMPLETE;
            draftState.error = null;
          });
          return { ...initialState, ...newState };
        },

        failure: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            const errors = payload.data.errors;

            draftState.status = ERROR;
            draftState.error = Object.keys(errors).reduce((accumulator, errorField) => {
              const fieldName = `${errorField.charAt(0).toUpperCase()}${errorField.slice(1)}`;

              const errorMsgs = errors[errorField].map((error) => `${fieldName} ${error}`);

              return [...accumulator, ...errorMsgs];
            }, []);
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

        success: () => {
          return initialState;
        },

        failure: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = ERROR;
            draftState.error = payload.data.error;
          });
          return { ...initialState, ...newState };
        },
      });

    case UPDATE:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = LOADING;
          });
          return { ...initialState, ...newState };
        },

        success: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = COMPLETE;
            draftState.current.user = json.data;
            if (json.included) draftState.current.included = json.included;
          });
          return { ...initialState, ...newState };
        },

        failure: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = ERROR;
            draftState.error = json.detail;
          });
          return { ...initialState, ...newState };
        },
      });

    default:
      return state;
  }
};

export default reducer;
