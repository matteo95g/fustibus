import { apiAction } from "@app/actions";
import ReportsApi from "./api";
import produce from "immer";
import { handle } from "redux-pack";
import { ERROR, LOADING, COMPLETE } from "@app/constants";

// Actions
export const UPDATE = "reports/UPDATE";
export const FIND = "reports/FIND";

// Action Creators
export const update = (attributes) => apiAction(UPDATE, ReportsApi.update(attributes));
export const find = () => apiAction(FIND, ReportsApi.find());

// Reducer
const initialState = {
  status: null,
  error: "",
  current: {
    report: {},
    included: [],
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { data: json } = payload || {};

  switch (type) {
    case FIND:
    case UPDATE:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = LOADING;
          });
          return { ...prevState, ...newState };
        },

        success: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.current.report = json.data;
            draftState.status = COMPLETE;
          });
          return { ...prevState, ...newState };
        },

        failure: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = ERROR;
            draftState.error = payload.data.error;
          });
          return { ...prevState, ...newState };
        },
      });
    default:
      return state;
  }
};

export default reducer;
