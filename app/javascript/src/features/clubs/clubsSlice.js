import { apiAction, standardAction } from "@app/actions";
import ClubsApi from "./api";
import produce from "immer";
import { handle } from "redux-pack";
import { ERROR, LOADING, COMPLETE } from "@app/constants";

// Actions
export const LIST = "clubs/LIST";
export const CREATE = "clubs/CREATE";
export const FIND = "clubs/FIND";
export const SET_PAGE = "clubs/SET_PAGE";

// Action Creators
export const list = (options = {}) => apiAction(LIST, ClubsApi.list(options));
export const create = (attributes = {}) => apiAction(CREATE, ClubsApi.create(attributes));
export const find = (id) => apiAction(FIND, ClubsApi.find(id));
export const setPage = (page) => standardAction(SET_PAGE, { page });

// Reducer
const initialState = {
  status: "",
  error: null,
  all: {
    clubs: [],
    included: [],
    pagination: {
      currentPage: 1,
      perPage: null,
      totalPages: null,
      totalEntries: null,
    },
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
    case SET_PAGE:
      const newState = produce(state, (draftState) => {
        draftState.all.pagination.currentPage = payload.page;
      });
      return { ...initialState, ...newState };

    case LIST:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = LOADING;
            draftState.current.club = null;
            draftState.current.included = [];
          });
          return { ...initialState, ...newState };
        },

        success: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.all.clubs = json.data;
            draftState.all.pagination = json.meta.pagination;
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

    case FIND:
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
            draftState.current.club = json.data;
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
