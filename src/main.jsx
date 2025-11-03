import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MoviesProvider from "./context/MoviesContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { BrowserRouter } from "react-router";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <MoviesProvider>
    <BrowserRouter>
      <ClerkProvider
        appearance={{
          theme: dark,
        }}
        publishableKey={PUBLISHABLE_KEY}
      >
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </MoviesProvider>
);
