import { apiAction } from "@app/actions";
import ClubsApi from "./api";
import produce from "immer";
import { handle } from "redux-pack";
import { ERROR, LOADING, COMPLETE } from "@app/constants";

// Actions
export const LIST = "clubs/LIST";
export const CREATE = "clubs/CREATE";

// Action Creators
export const list = (options = {}) => apiAction(LIST, ClubsApi.list(options));
export const create = (attributes = {}) => apiAction(CREATE, ClubsApi.create(attributes));

// Reducer
const initialState = {
  status: "",
  error: null,
  all: {
    clubs: [],
    included: [],
  },
  current: {
    club: null,
    included: [],
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { data: json } = payload || {};

  switch (type) {
    case LIST:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = LOADING;
          });
          return { ...initialState, ...newState };
        },

        success: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.all.clubs = json.data;
            if (json.included) draftState.all.included = json.included;
            draftState.status = COMPLETE;
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

    case CREATE:
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
            draftState.all.clubs.push(json.data);
            if (json.included) draftState.all.included.push(json.included);
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
