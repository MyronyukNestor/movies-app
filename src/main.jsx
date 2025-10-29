import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MoviesProvider from "./context/MoviesContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// afterSignOutUrl="/"

createRoot(document.getElementById("root")).render(
  <MoviesProvider>
    <ClerkProvider
      appearance={{
        theme: dark,
      }}
      publishableKey={PUBLISHABLE_KEY}
    >
      <App />
    </ClerkProvider>
  </MoviesProvider>
);
