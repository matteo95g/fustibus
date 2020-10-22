export const reportsState = (state) => state.reports;

export const currentReport = (state) => reportsState(state).current?.report;
