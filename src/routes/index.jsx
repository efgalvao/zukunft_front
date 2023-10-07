import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "../Pages/HomePage";
import Signup from "../Pages/Signup";
import { Login } from "../Pages/Login";
import { Logout } from "../Pages/Logout";
import { AboutPage } from "../Pages/AboutPage";
import { NotFoundPage } from "../Pages/NotFoundPage";

import CategoryList from "../Categories/CategoryList";
import NewCategory from "../Categories/NewCategory";

import AccountList from "../Accounts/AccountList";
import NewAccount from "../Accounts/NewAccount";
import Account from "../Accounts/Account";

import CardList from "../Cards/CardList";
import Card from "../Cards/Card";
import NewCard from "../Cards/NewCard";
import CardTransactionList from "../Transactions/CardTransactionList";

import TransactionList from "../Transactions/TransactionList";
import NewTransaction from "../Transactions/NewTransaction";
import UpdateTransaction from "../Transactions/UpdateTransaction";

import TransferenceList from "../Transferences/TransferenceList";
import NewTransference from "../Transferences/NewTransference";

import NewStock from "../Stocks/NewStock";
import Stock from "../Stocks/Stock";

export default (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/categories" element={<CategoryList />} />
    <Route path="/category" element={<NewCategory />} />
    <Route path="*" element={<NotFoundPage />} />
    <Route path="/accounts" element={<AccountList />} />
    <Route path="/account" element={<NewAccount />} />
    <Route path="/account/:id" element={<Account />} />
    <Route path="/cards" element={<CardList />} />
    <Route path="/cards/:id" element={<Card />} />
    <Route path="/card" element={<NewCard />} />
    <Route path="/cards/:cardId/transactions" element={<CardTransactionList />} />

    <Route path="/accounts/:accountId/transactions" element={<TransactionList />} />
    <Route path="/accounts/:accountId/transaction" element={<NewTransaction />} />
    <Route path="/update-transaction/:id" element={<UpdateTransaction />} />
    <Route path="/transferences" element={<TransferenceList />} />
    <Route path="/transference" element={<NewTransference />} />
    <Route path="/accounts/:accountId/stock" element={<NewStock />} />
    <Route path="/stock/:stockId" element={<Stock />} />
  </Routes>
);
