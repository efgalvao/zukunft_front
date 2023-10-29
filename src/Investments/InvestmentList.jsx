import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import investmentServiceInstance from "../services/investment.service";
import Statement from "./StatementWrapper";
import { LinkButton } from '../Common/Buttons';

const InvestmentList = () => {
  const navigate = useNavigate();
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    investmentServiceInstance.getInvestmentsList().then((response) => {
      if (response.status === 200) {
        setInvestments(response.data)
      }
    },
      error => {
        console.log("Network response was not ok.")
        navigate("/");
      });
  }, []);

  const allInvestments = (
    <div>
      <Statement investments={investments} />
    </div>
  );

  const noInvestment = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        Nenhum investimento encontrado.
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-1">
          <h1 className="display-4">Investimentos</h1>
          <p className="lead text-muted">
            Investimentos em corretoras.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="mb-3">
          </div>
          <div className="row">
            {investments.length > 0 ? allInvestments : noInvestment}
          </div>
        </main>
      </div>
      <LinkButton linkTo="/" buttonText="Home" color="green" />
    </>
  );
};

export default InvestmentList;
