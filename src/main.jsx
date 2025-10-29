import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MoviesProvider from "./context/MoviesContext.jsx";

createRoot(document.getElementById("root")).render(
  <MoviesProvider>
    <App />
  </MoviesProvider>
);
