import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TransactionService from "../services/transaction.service";
import Statement from "./StatementWrapper";

const TransactionList = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const { accountId } = useParams();

  useEffect(() => {
    TransactionService.getTransactionList(accountId).then((res) => {
      if (res.status === 200) {
        setTransactions(res.data)
        return res.data;
      }
    },
      error => {
        console.log("Network response was not ok.")
        navigate("/");
      });
  }, [accountId, navigate]);

  const allTransactions = (
    <div>
      <Statement transactions={transactions} />
    </div>
  );
  const noTransaction = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No transactions yet. Why not <Link to="/transaction">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Transactions</h1>
          <p className="lead text-muted">
            Here are all your transactions for this account.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <Link to={`/accounts/${accountId}/transaction`} className="btn custom-button">
              Create New Transaction
            </Link>
          </div>
          <div className="row">
            {transactions.length > 0 ? allTransactions : noTransaction}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default TransactionList;
