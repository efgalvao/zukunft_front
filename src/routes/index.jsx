import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "../Pages/HomePage";
import { AboutPage } from "../Pages/AboutPage";
import { NotFoundPage } from "../Pages/NotFoundPage";

export default (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
