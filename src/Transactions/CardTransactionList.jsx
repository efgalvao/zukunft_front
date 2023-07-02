import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TransactionService from "../services/transaction.service";
import Statement from "./StatementWrapper";
import { LinkButton } from "../Common/Buttons";

const CardTransactionList = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const { cardId } = useParams();

  useEffect(() => {
    TransactionService.getTransactionList(cardId).then((res) => {
      console.log(' CardTransactionList.jsx');
      console.log(cardId);
      if (res.status === 200) {
        setTransactions(res.data)
        return res.data;
      }
    },
      error => {
        console.log("Network response was not ok.")
        navigate("/");
      });
  }, [cardId, navigate]);

  const allTransactions = (
    <div>
      <Statement transactions={transactions} />
    </div>
  );
  const noTransaction = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        Não há transações. <Link to="/transaction">Criar uma</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-1">
          <h1 className="display-4">Transactions</h1>
          <p className="lead text-muted">
            Todas transações do cartão.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container py-2">
          <div className="mb-3">
            <LinkButton linkTo={`/cards/${cardId}/transaction`} buttonText="Create New Transaction" color="blue" />
          </div>
          <div className="container py-2">
            {transactions.length > 0 ? allTransactions : noTransaction}
          </div>
          <LinkButton linkTo={`/cards/${cardId}`} buttonText="Voltar para Cartão" color="blue" />
        </main>
      </div>
    </>
  );
};

export default CardTransactionList;
