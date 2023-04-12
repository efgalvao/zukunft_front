import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "../Pages/HomePage";
import { Login } from "../Pages/Login";
import { AboutPage } from "../Pages/AboutPage";
import { NotFoundPage } from "../Pages/NotFoundPage";

import CategoryList from "../Categories/CategoryList";
import NewCategory from "../Categories/NewCategory";
import Category from "../Categories/Category";

export default (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/categories" element={<CategoryList />} />
    <Route path="/category" element={<NewCategory />} />
    <Route path="/category/:id" element={<Category />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
