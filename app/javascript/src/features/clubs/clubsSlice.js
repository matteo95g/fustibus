import { apiAction, standardAction } from "@app/actions";
import ClubsApi from "./api";
import produce from "immer";
import { handle } from "redux-pack";
import { ERROR, LOADING, COMPLETE } from "@app/constants";

// Actions
export const LIST = "clubs/LIST";
export const CREATE = "clubs/CREATE";
export const DESTROY = "clubs/DESTROY";
export const FIND = "clubs/FIND";
export const SET_PAGE = "clubs/SET_PAGE";
export const UPDATE = "clubs/UPDATE";

// Action Creators
export const list = (options = {}) => apiAction(LIST, ClubsApi.list(options));
export const create = (attributes = {}) => apiAction(CREATE, ClubsApi.create(attributes));
export const destroy = (id) => apiAction(DESTROY, ClubsApi.destroy(id), { clubId: id });
export const find = (id) => apiAction(FIND, ClubsApi.find(id));
export const update = (id, attributes) => apiAction(UPDATE, ClubsApi.update(id, attributes));
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

    case UPDATE:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = LOADING;
          });
          return { ...initialState, ...newState };
        },

        success: (prevState) => {
          const attributes = json.data.attributes;
          const clubId = json.data.id;
          const index = prevState.all.clubs.findIndex((club) => club.id.toString() === clubId);
          const newState = produce(prevState, (draftState) => {
            draftState.status = COMPLETE;
            draftState.current.club = json.data;
            draftState.all.clubs[index].attributes = attributes;
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

    case DESTROY:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = LOADING;
          });
          return { ...initialState, ...newState };
        },

        success: (prevState) => {
          const clubId = action.meta.clubId;
          const newState = produce(prevState, (draftState) => {
            draftState.status = COMPLETE;
            draftState.current.club = null;
            draftState.all.clubs = prevState.all.clubs.filter((club) => club.id !== clubId);
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
