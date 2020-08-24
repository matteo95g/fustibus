import { createStore, applyMiddleware, compose } from "redux";
import { middleware } from "redux-pack";
import rootReducer from "./rootReducer";
import { unauthorizeHandler } from "./middlewares";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
  compose;

const customMidlewares = [unauthorizeHandler];

export default () => {
  let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(middleware, ...customMidlewares)));
  let persistor = persistStore(store);
  return { store, persistor };
};
