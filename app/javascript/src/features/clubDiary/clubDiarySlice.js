import { apiAction } from "@app/actions";
import ClubDiaryApi from "./api";
import produce from "immer";
import { handle } from "redux-pack";
import { ERROR, LOADING, COMPLETE } from "@app/constants";

// Actions
export const LIST_MISSIONS = "clubDiary/missions/LIST";
export const CREATE_MISSION = "clubDiary/missions/CREATE";
export const UPDATE_MISSION = "clubDiary/mission/UPDATE";
export const DELETE_MISSION = "clubDiary/missions/DELETE";

// Action Creators
export const listMissions = () => apiAction(LIST_MISSIONS, ClubDiaryApi.listMissions());
export const createMission = (attributes = {}) => apiAction(CREATE_MISSION, ClubDiaryApi.create(attributes));
export const updateMission = (id, attributes) => apiAction(UPDATE_MISSION, ClubDiaryApi.update(id, attributes));
export const deleteMission = (id) => apiAction(DELETE_MISSION, ClubDiaryApi.delete(id), { clubId: id });

// Reducer
const initialState = {
  status: null,
  createMissionStatus: null,
  updateMissionStatus: null,
  deleteMissionStatus: null,
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
    case CREATE_MISSION:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.createMissionStatus = LOADING;
          });
          return { ...initialState, ...newState };
        },

        success: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.createMissionStatus = COMPLETE;
          });
          return { ...initialState, ...newState };
        },

        failure: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.createMissionStatus = ERROR;
            draftState.error = json.detail;
          });
          return { ...initialState, ...newState };
        },
      });
    case UPDATE_MISSION:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.updateMissionStatus = LOADING;
          });
          return { ...initialState, ...newState };
        },

        success: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.updateMissionStatus = COMPLETE;
          });
          return { ...initialState, ...newState };
        },

        failure: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.updateMissionStatus = ERROR;
            draftState.error = json.detail;
          });
          return { ...initialState, ...newState };
        },
      });
    case DELETE_MISSION:
      return handle(state, action, {
        start: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.deleteMissionStatus = LOADING;
          });
          return { ...initialState, ...newState };
        },

        success: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.deleteMissionStatus = COMPLETE;
          });
          return { ...initialState, ...newState };
        },

        failure: (prevState) => {
          const newState = produce(prevState, (draftState) => {
            draftState.deleteMissionStatus = ERROR;
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
