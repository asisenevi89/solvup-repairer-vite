import { compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../Sagas";
import caseListReducer from '../Slices/CaseList'
import userReducer from '../Slices/User';
import generalReducer from "../Slices/General";
import caseActionReducer from "../Slices/CaseAction";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const sagaMiddleWare = createSagaMiddleware();

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = configureStore({
  reducer: {
    general: generalReducer,
    user: userReducer,
    caseList: caseListReducer,
    caseAction: caseActionReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(thunk).concat(sagaMiddleWare),
  devTools: import.meta.env.MODE !== 'production',
});

// export const store =  createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleWare)));
sagaMiddleWare.run(rootSaga);
