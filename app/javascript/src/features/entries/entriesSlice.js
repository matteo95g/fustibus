import { apiAction } from "@app/actions";
import EntriesApi from "./api";
import produce from "immer";
import { handle } from "redux-pack";
import { ERROR, LOADING, COMPLETE } from "@app/constants";

// Actions
export const CREATE_ENTRY = "entries/CREATE";
export const LIST = "entries/LIST";
export const DESTROY_ENTRY = "entries/DESTROY";
export const UPDATE_ENTRY = "entries/UPDATE";
export const FIND_ENTRY = "entries/FIND";

// Action Creators
export const create = (fieldForlderId, attributes = {}) => apiAction(CREATE_ENTRY, EntriesApi.create(fieldForlderId, attributes));
export const list = (fieldForlderId, attributes = {}) => apiAction(LIST, EntriesApi.list(fieldForlderId, attributes));
export const destroy = (fieldForlderId, id) => apiAction(DESTROY_ENTRY, EntriesApi.destroy(fieldForlderId, id), { entryId: id });
export const update = (fieldForlderId, id, attributes = {}) =>
  apiAction(UPDATE_ENTRY, EntriesApi.update(fieldForlderId, id, attributes));
export const find = (fieldForlderId, id) => apiAction(FIND_ENTRY, EntriesApi.find(fieldForlderId, id));

// Reducer
const initialState = {
  status: "",
  error: null,
  current: {
    entry: {},
    entries: [],
    included: [],
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { data: json } = payload || {};

  switch (type) {
    case CREATE_ENTRY:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = LOADING;
          });
          return { ...initialState, ...newState };
        },

        success: (prevState) => {
          let sortedEntries = prevState.current.entries.slice();
          sortedEntries.push(json.data);
          sortedEntries.sort((a, b) => new Date(b?.attributes?.date) - new Date(a?.attributes?.date));
          const newState = produce(prevState, (draftState) => {
            draftState.status = COMPLETE;
            draftState.current.entries = sortedEntries;
            if (json.included) draftState.current.included.push(json.included);
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
            draftState.status = COMPLETE;
            draftState.current.entries = json.data;
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

    case DESTROY_ENTRY:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = LOADING;
          });
          return { ...initialState, ...newState };
        },

        success: (prevState) => {
          const entryId = action.meta.entryId;
          const newState = produce(prevState, (draftState) => {
            draftState.status = COMPLETE;
            draftState.current.entries = prevState.current.entries.filter((entry) => entry.id.toString() !== entryId);
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

    case FIND_ENTRY:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = LOADING;
            draftState.current.entry = null;
          });
          return { ...initialState, ...newState };
        },

        success: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = COMPLETE;
            draftState.current.entry = json.data;
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

    case UPDATE_ENTRY:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = LOADING;
          });
          return { ...initialState, ...newState };
        },

        success: (prevState) => {
          const attributes = json.data.attributes;
          const entryId = json.data.id;
          const index = prevState.current.entries.findIndex((entry) => entry.id.toString() === entryId);

          const newState = produce(prevState, (draftState) => {
            draftState.status = COMPLETE;
            draftState.current.entries[index].attributes = attributes;
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
