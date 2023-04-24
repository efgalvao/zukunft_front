import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TransactionService from "../services/transaction.service";
import Statement from "./StatementWrapper";
import { LinkButton } from "../Common/Buttons";

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
            <LinkButton linkTo={`/accounts/${accountId}/transaction`} buttonText="Create New Transaction" color="blue" />
          </div>
          <div className="row">
            {transactions.length > 0 ? allTransactions : noTransaction}
          </div>
          <LinkButton linkTo={`/account/${accountId}`} buttonText="Back to Account" color="blue" />
        </main>
      </div>
    </>
  );
};

export default TransactionList;
