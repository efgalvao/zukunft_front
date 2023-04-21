import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "../Pages/HomePage";
import Signup from "../Pages/Signup";
import { Login } from "../Pages/Login";
import { AboutPage } from "../Pages/AboutPage";
import { NotFoundPage } from "../Pages/NotFoundPage";

import CategoryList from "../Categories/CategoryList";
import NewCategory from "../Categories/NewCategory";
import Category from "../Categories/Category";

import AccountList from "../Accounts/AccountList";
import NewAccount from "../Accounts/NewAccount";
import Account from "../Accounts/Account";

import CardList from "../Cards/CardList";
import Card from "../Cards/Card";
import NewCard from "../Cards/NewCard";

import TransactionList from "../Transactions/TransactionList";
import NewTransaction from "../Transactions/NewTransaction";
import UpdateTransaction from "../Transactions/UpdateTransaction";

export default (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/categories" element={<CategoryList />} />
    <Route path="/category" element={<NewCategory />} />
    <Route path="/category/:id" element={<Category />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="*" element={<NotFoundPage />} />
    <Route path="/accounts" element={<AccountList />} />
    <Route path="/account" element={<NewAccount />} />
    <Route path="/account/:id" element={<Account />} />
    <Route path="/cards" element={<CardList />} />
    <Route path="/cards/:id" element={<Card />} />
    <Route path="/card" element={<NewCard />} />
    <Route path="/accounts/:accountId/transactions" element={<TransactionList />} />
    <Route path="/accounts/:accountId/transaction" element={<NewTransaction />} />
    <Route path="/update-transaction/:id" element={<UpdateTransaction />} />

  </Routes>
);
