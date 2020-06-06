import { createStore, applyMiddleware, compose } from "redux";
import { middleware } from "redux-pack";
import rootReducer from "./rootReducer";

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
  compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(middleware)));

export default store;
