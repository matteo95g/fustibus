import { createStore, applyMiddleware, compose } from "redux";
import { middleware } from "redux-pack";
import rootReducer from "./rootReducer";
import { unauthorizeHandler } from "./middlewares";

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
  compose;

const customMidlewares = [unauthorizeHandler];

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(middleware, ...customMidlewares)));

export default store;
