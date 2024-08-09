import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ClassesProvider } from "./context/ClassContext.jsx";
import { TeachersProvider } from "./context/TeachersContext.jsx";
import { StudentProvider } from "./context/StudentContext.jsx";
import AppProvider from "./context/AppContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AppProvider>
        <TeachersProvider>
          <ClassesProvider>
            <StudentProvider>
              <App />
            </StudentProvider>
          </ClassesProvider>
        </TeachersProvider>
      </AppProvider>
    </Router>
  </React.StrictMode>
);
