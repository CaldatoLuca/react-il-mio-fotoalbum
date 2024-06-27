import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { PhotosProvider } from "./contexts/PhotosContext.jsx";
import { GlobalProvider } from "./contexts/GlobalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PhotosProvider>
          <GlobalProvider>
            <App />
          </GlobalProvider>
        </PhotosProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
