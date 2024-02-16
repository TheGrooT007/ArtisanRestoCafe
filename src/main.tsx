import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App"; // Adjust the import path if App is in a different folder
import { store } from "../store"; // Make sure this path points correctly to your store file
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
