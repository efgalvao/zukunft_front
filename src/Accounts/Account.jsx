import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountService from "../services/account.service";
import styled from 'styled-components';
import { LinkButton } from '../Common/Buttons';
import { FunctionButton } from '../Common/Buttons';

import AccountSummary from "./AccountSummary";
import AccountReport from "./AccountReport";
import './Account.css';
import PastTotalBalanceChart from "./PastTotalBalanceChart";
import PastReportsList from "./PastReportsList";
import PastReportsChart from "./PastReportsChart";

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const Account = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [report, setReport] = useState('');
  const [reports, setReports] = useState([]);

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
        setAccount(response.data)
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
        <Title>{account.name}</Title>
        <div className="buttons">
          <LinkButton linkTo={`/accounts/${account.id}/transactions`} buttonText="Transactions" color="green" />
          <LinkButton linkTo={`/accounts/${account.id}/transaction`} buttonText="New Transaction" color="blue" />
        </div>
      </div>

      <AccountSummary account={account} />
      <AccountReport report={report} />
      <PastTotalBalanceChart data={reports} />
      <PastReportsList reports={reports} />
      <PastReportsChart data={reports} />

      <div className="buttons">
        <FunctionButton buttonText="Delete Account" color="red" onClick={handleDelete} type="button" />

        <LinkButton linkTo={'/accounts'} buttonText="Back to Accounts" color="blue" />
      </div>
    </div >
  );
};

export default Account;
