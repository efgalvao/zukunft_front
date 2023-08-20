import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardService from "../services/card.service";
import AccountReportService from "../services/account.report.service";
import { Wrapper, Title, SubTitle } from './styles';
import { LinkButton, FunctionButton } from '../Common/Buttons';
import PastReportsChart from "./PastReportsChart";
import FutureReportsChart from "./FutureReportsChart";
import NewTransaction from "../Transactions/NewTransaction";

const Card = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState({ attributes: {} });
  const [currentReport, setCurrentReport] = useState({ attributes: {} });
  const [pastReports, setPastReports] = useState([]);
  const [futureReports, setFutureReports] = useState([]);


  const currentDate = new Date();
  const sixMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
  const pastReportsRequest = {
    account_id: params.id,
    start_date: sixMonthAgo,
    end_date: currentDate
  }
  const sixMonthFromNow = new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, currentDate.getDate());
  const futureReportsRequest = {
    account_id: params.id,
    start_date: currentDate,
    end_date: sixMonthFromNow
  }


  useEffect(() => {
    CardService.getCard(params.id).then((response) => {

      if (response.status === 200) {
        setCard(response.data)
        return response.data;
      }
    }, error => {
      console.log("Network response was not ok.")
      navigate("/cards");
    });
    AccountReportService.getCurrentAccountReport(params.id).then((response) => {
      if (response.status === 200) {
        setCurrentReport(response.data)

        return response.data;
      }
    }, error => {
      console.log("Network response was not ok." + error)
      pastReportsRequest({})
      navigate("/cards");
    });
    AccountReportService.getAccountReports(pastReportsRequest).then((response) => {
      if (response.status === 200) {
        setPastReports(response.data)

        return response.data;
      }
    }, error => {
      console.log("Network response was not ok." + error)
      pastReportsRequest({})
      navigate("/cards");
    });
    AccountReportService.getAccountReports(futureReportsRequest).then((response) => {
      if (response.status === 200) {
        setFutureReports(response.data)

        return response.data;
      }
    }, error => {
      console.log("Network response was not ok." + error)
      setFutureReports({})
      navigate("/cards");
    });
  }, [params.id]);

  const handleDelete = () => {
    CardService.deleteCard(params.id).then((response) => {
      if (response.status === 200) {
        navigate("/cards")
      }
    },
      error => {
        console.log("Network response was not ok.")
      }
    )
  };

  return (

    <div className="">
      <div className='title'>
        <Title>{card.attributes.name}</Title>
        <div className="buttons">
          <LinkButton linkTo={`/cards/${card.id}/transactions`} buttonText="Transações" color="blue" />
          <NewTransaction id={card.id} />
        </div>
      </div>

      <div className="container py-1">
        <SubTitle>
          Resumo
        </SubTitle>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Saldo:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{`R$ ${(card.attributes.balance_cents / 100).toFixed(2)} `}</td>
            </tr>
          </tbody>
        </table >

        <SubTitle>
          Resumo do Mês
        </SubTitle>
        <Wrapper>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Recebimentos:</th>
                <th>Gastos:</th>
                <th>Balanço:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{`R$ ${(currentReport.attributes.incomes_cents / 100).toFixed(2)} `}</td>
                <td>{`R$ ${(currentReport.attributes.expenses_cents / 100).toFixed(2)} `}</td>
                <td>{`R$ ${(currentReport.attributes.final_balance_cents / 100).toFixed(2)} `}</td>
              </tr>
            </tbody>
          </table >

        </Wrapper>
        <PastReportsChart data={pastReports} />
        <FutureReportsChart data={futureReports} />

        <div className="container py-2">
          <FunctionButton buttonText="Apagar Cartão" color="red" onClick={handleDelete} type="button" />

          <LinkButton linkTo={'/cards'} buttonText="Voltar para Cartões" color="blue" />
        </div>
      </div>
    </div>
  );
};

export default Card;
