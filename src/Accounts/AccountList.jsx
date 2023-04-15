import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountService from "../services/account.service";
import Card from "./CardWrapper";

const AccountList = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    AccountService.getAccountList().then((res) => {
      if (res.status === 200) {

        setAccounts(res.data)
        return res.data;
      }
    },
      error => {
        console.log("Network response was not ok.")
        navigate("/");
      });
  }, []);

  const allAccounts = accounts.map((account, index) => (
    <div>
      <Card data={account} />
    </div>
  ));
  const noAccount = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No accounts yet. Why not <Link to="/account">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Accounts for every occasion</h1>
          <p className="lead text-muted">
            Here are all your accounts.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <Link to="/account" className="btn custom-button">
              Create New Account
            </Link>
          </div>
          <div className="row">
            {accounts.length > 0 ? allAccounts : noAccount}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default AccountList;
