import { apiAction } from "@app/actions";
import PostersApi from "./api";
import produce from "immer";
import { handle } from "redux-pack";
import { ERROR, LOADING, COMPLETE } from "@app/constants";

// Actions
export const CREATE = "posters/CREATE";
export const FIND = "posters/FIND";
export const UPDATE = "posters/UPDATE";

// Action Creators
export const create = (clubId, attributes) => apiAction(CREATE, PostersApi.create(clubId, attributes));
export const find = (clubId) => apiAction(CREATE, PostersApi.find(clubId));
export const update = (clubId, attributes) => apiAction(UPDATE, PostersApi.update(clubId, attributes));

// Reducer
const initialState = {
  status: null,
  posterId: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { data: json } = payload || {};

  switch (type) {
    case CREATE:
    case FIND:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.status = LOADING;
          });
          return { ...prevState, ...newState };
        },

        success: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.posterId = json.data.id;
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
