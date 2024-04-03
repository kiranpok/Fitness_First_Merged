import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import { GoalsContextProvider } from "./context/GoalContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoalsContextProvider>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </GoalsContextProvider>
    
  
  </React.StrictMode>
);
