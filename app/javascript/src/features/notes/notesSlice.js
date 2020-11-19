import { apiAction } from "@app/actions";
import NotesApi from "./api";
import produce from "immer";
import { handle } from "redux-pack";
import { ERROR, LOADING, COMPLETE } from "@app/constants";

// Actions
export const CREATE = "notes/CREATE";

// Action Creators
export const create = (noteId, attributes = {}) => apiAction(CREATE, NotesApi.create(noteId, attributes));

// Reducer
const initialState = {
  status: "",
  error: null,
  all: {
    notes: [],
    included: [],
    pagination: {
      currentPage: 1,
      perPage: null,
      totalPages: null,
      totalEntries: null,
    },
  },
  current: {
    note: null,
    included: [],
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { data: json } = payload || {};

  switch (type) {
    case CREATE:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = LOADING;
          });
          return { ...state, ...newState };
        },

        success: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = COMPLETE;
            draftState.current.note = json.data;
            if (json.included) draftState.current.included.push(json.included);
          });
          return { ...state, ...newState };
        },

        failure: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = ERROR;
            draftState.error = json.detail;
          });
          return { ...state, ...newState };
        },
      });

    default:
      return state;
  }
};

export default reducer;
