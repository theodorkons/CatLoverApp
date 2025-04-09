import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home.tsx";
import Breeds from "./pages/breeds.tsx";
import Favourites from "./pages/favourites.tsx";
import NavBar from "./components/Navbar.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="breeds" element={<Breeds />} />
          <Route path="favourites" element={<Favourites />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
