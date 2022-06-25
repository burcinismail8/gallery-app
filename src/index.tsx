import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { fetchImagesData } from "./store/actions/fetchData";
import reducer from "./store/reducers/reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(fetchImagesData());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
