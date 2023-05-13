import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountService from "../services/account.service";
import styled from 'styled-components';
import { LinkButton } from '../Common/Buttons';
import AccountSummary from "./AccountSummary";

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

  useEffect(() => {
    AccountService.getAccount(params.id).then((response) => {
      if (response.status === 200) {
        setAccount(response.data)
        return response.data;
      }
    }, error => {
      console.log("Network response was not ok.")
      navigate("/accounts");
    });
  }, [params.id]);

  const deleteAccount = () => {
    AccountService.deleteAccount(params.id).then((response) => {
      if (response.status === 200) {
        navigate("/accounts")
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
        <Title>{account.name}</Title>
        <div>
          <LinkButton linkTo={`/accounts/${account.id}/transactions`} buttonText="Transactions" color="green" />
          <LinkButton linkTo={`/accounts/${account.id}/transaction`} buttonText="New Transaction" color="blue" />
        </div>

      </div>
      <AccountSummary balance={account.balance_cents} kind={account.kind} lastUpdate={account.updated_at} />
      <div className="container py-1">
        <div className="row">
          <div className="col-sm-12 col-lg-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
        <LinkButton linkTo={'/accounts'} buttonText="Back to Accounts" color="blue" />

      </div>
    </div >
  );
};

export default Account;
