import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { Home } from "./pages/Home";
import { Show } from "./pages/Show";
import { Create } from "./pages/Create";
import { Auth } from "./pages/Auth";

import { Nav } from "./components/Nav";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create_recipe" element={<Create/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/view_recipes" element={<Show/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
