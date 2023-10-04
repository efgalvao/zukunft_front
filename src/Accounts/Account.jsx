import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountService from "../services/account.service";
import stockServiceInstance from "../services/stock.service";
import './Account.css';
import { LinkButton, FunctionButton } from '../Common/Buttons';

import NewTransaction from "../Transactions/NewTransaction";
import AccountSummary from "./AccountSummary";
import AccountReport from "./AccountReport";
import PastTotalBalanceChart from "./PastTotalBalanceChart";
import PastReportsList from "./PastReportsList";
import PastReportsChart from "./PastReportsChart";
import NewStock from "../Stocks/NewStock";
import StockList from "../Stocks/StockList";

const Account = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [report, setReport] = useState('');
  const [reports, setReports] = useState([]);
  const [stocks, setStocks] = useState([]);

  const currentDate = new Date();
  const sixMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
  const accountReportsRequest = {
    account_id: params.id,
    start_date: sixMonthAgo,
    end_date: currentDate
  }


  useEffect(() => {
    AccountService.getAccount(params.id).then((response) => {
      if (response.status === 200) {
        setAccount(response.data.attributes)
        return response.data;
      }
    }, error => {
      console.log("Network response was not ok." + error)
      navigate("/accounts");
    });
    AccountService.getAccountReport(params.id).then((response) => {
      if (response.status === 200) {
        setReport(response.data)
        return response.data;
      }
    }, error => {
      console.log("Network response was not ok." + error)
      setReport({ updated_at: "0", balance: 0, income: 0, expense: 0 })
      navigate("/accounts");
    });
    AccountService.getAccountReports(accountReportsRequest).then((response) => {
      if (response.status === 200) {
        setReports(response.data)
        return response.data;
      }
    }, error => {
      console.log("Network response was not ok." + error)
      setReport({ updated_at: "0", balance: 0, income: 0, expense: 0 })
      navigate("/accounts");
    });
    stockServiceInstance.getStockList(params.id).then((response) => {
      if (response.status === 200) {
        setStocks(response.data)
        return response.data;
      }
    }, error => {
      console.log("Network response was not ok." + error)
      setStocks({ updated_at: "0", balance: 0, income: 0, expense: 0 })
      navigate("/accounts");
    });
  }, [params.id]
  );

  const handleDelete = () => {
    AccountService.deleteAccount(params.id).then((response) => {
      if (response.status === 200) {
        navigate("/accounts")
      }
    },
      error => {
        console.log("Network response was not ok." + error)
      }
    )
  };

  return (
    <div className="">
      <div className='title'>
        {account.name}
      </div>
      <div className="buttons">
        <LinkButton linkTo={`/accounts/${account.id}/transactions`} buttonText="Transações" color="green" />
        <NewTransaction id={account.id} />
        {account.kind === "broker" &&
          <NewStock accountId={account.id} accountName={account.name} />
        }
      </div>

      <AccountSummary account={account} />
      <AccountReport report={report} />
      <PastTotalBalanceChart data={reports} />
      <PastReportsList reports={reports} />
      <PastReportsChart data={reports} />
      {stocks && stocks.length > 0 &&
        <StockList stocks={stocks} />
      }

      <div className="container py-2">
        <FunctionButton buttonText="Remover Conta" color="red" onClick={handleDelete} type="button" />

        <LinkButton linkTo={'/accounts'} buttonText="Voltar" color="blue" />
      </div>
    </div >
  );
};

export default Account;
