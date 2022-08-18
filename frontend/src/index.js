import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/style.scss";
import store from "./Redux/store";
import { Provider } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

const options = {
  position: positions.TOP_CENTER,
  timeout: 4000,
  offset: "30px",
  transition: transitions.SCALE,
};

const AlertTemplate = ({ style, options, message, close }) => (
  <div
    style={style}
    className={
      options.type === "info"
        ? "alert-info"
        : options.type === "success"
        ? "alert-success"
        : "alert-error"
    }
  >
    {message}
    <button onClick={close}>X</button>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);
