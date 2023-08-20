import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TransactionService from "../services/transaction.service";
import Statement from "./StatementWrapper";
import { LinkButton } from "../Common/Buttons";
import NewTransaction from "../Transactions/NewTransaction";

const CardTransactionList = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const { cardId } = useParams();

  useEffect(() => {
    TransactionService.getTransactionList(cardId).then((res) => {
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
          <h1 className="display-4">Transações</h1>
        </div>
      </section>
      <div className="py-5">
        <main className="container py-2">
          <div className="mb-3">
            <NewTransaction />
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
