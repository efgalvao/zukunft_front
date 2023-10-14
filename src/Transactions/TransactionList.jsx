import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TransactionService from "../services/transaction.service";
import Statement from "./StatementWrapper";
import { LinkButton } from "../Common/Buttons";
import NewTransaction from "./NewTransaction";

const TransactionList = () => {
  const navigate = useNavigate();
  const [pastTransactions, setPastTransactions] = useState([]);
  const [futureTransactions, setFutureTransactions] = useState([]);
  const { accountId } = useParams();

  useEffect(() => {
    TransactionService.getTransactionList(accountId).then((res) => {
      if (res.status === 200) {
        setPastTransactions(res.data.past_transactions);
        setFutureTransactions(res.data.future_transactions);
        return res.data;
      }
    },
      error => {
        console.log("Network response was not ok.")
        navigate("/");
      });
  }, [accountId]);

  const pastTransactionsTab = (
    <div>
      <Statement transactions={pastTransactions} />
    </div>
  );
  const futureTransactionsTab = (
    <div>
      <Statement transactions={futureTransactions} />
    </div>
  );
  const noTransaction = (
    <div className="vh-50 d-flex align-items-center justify-content-center">
      <h4>
        Não há transações cadastradas.
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
        <main className="container">
          <div className="text-end mb-3">
            <NewTransaction id={accountId} />
          </div>
          <div className="row">
            <div className="col-12">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button className="nav-link active" id="nav-past-tab" data-bs-toggle="tab" data-bs-target="#nav-past" type="button" role="tab" aria-controls="nav-past" aria-selected="true">Transações Anteriores</button>
                  <button className="nav-link" id="nav-future-tab" data-bs-toggle="tab" data-bs-target="#nav-future" type="button" role="tab" aria-controls="nav-future" aria-selected="false">Transações Futuras</button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-past" role="tabpanel" aria-labelledby="nav-past-tab">
                  {pastTransactions.length > 0 ? pastTransactionsTab : noTransaction}
                </div>
                <div className="tab-pane fade" id="nav-future" role="tabpanel" aria-labelledby="nav-future-tab">
                  {futureTransactions.length > 0 ? futureTransactionsTab : noTransaction}
                </div>
              </div>
            </div>
          </div>
          <LinkButton linkTo={`/account/${accountId}`} buttonText="Voltar" color="blue" />
        </main>
      </div>
    </>
  );
};

export default TransactionList;
