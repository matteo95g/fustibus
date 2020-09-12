import { apiAction, standardAction } from "@app/actions";
import ClubDiaryApi from "./api";
import produce from "immer";
import { handle } from "redux-pack";
import { ERROR, LOADING, COMPLETE } from "@app/constants";

// Actions
export const LIST_MISSIONS = "clubDiary/missions/LIST";

// Action Creators
export const listMissions = (clubId) => apiAction(LIST_MISSIONS, ClubDiaryApi.listMissions(clubId));

// Reducer
const initialState = {
  status: null,
  error: null,
  current: {
    missions: [],
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { data: json } = payload || {};

  switch (type) {
    case LIST_MISSIONS:
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
            draftState.current.missions = json.data;
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
