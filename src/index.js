import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css"
import App from "./App";
import { OfflinePage } from "./screens";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Offline from "react-offline";
import store from "./redux/store/index";

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <Offline>
          {({ isOffline, isOnline }) => {
            return isOffline ? <OfflinePage /> : <App />;
          }}
        </Offline>
        ,
      </BrowserRouter>
    </div>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
