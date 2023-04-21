import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TransactionService from "../services/transaction.service";
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Value = styled.span`
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const Transaction = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState('');

  useEffect(() => {
    TransactionService.getTransaction(params.id).then((response) => {
      if (response.status === 200) {
        setTransaction(response.data)
        return response.data;
      }
    }, error => {
      console.log("Network response was not ok.")
      navigate("/accounts");
    });
  }, [params.id]);

  return (
    <div className="">
      <div>
        <Title>{transaction.title}</Title>
      </div>
      <div className="container py-5">
        <Wrapper>
          <div>
            <Label>Kind:</Label>
            <Value>{transaction.kind}</Value>
          </div>
          <div>
            <Label>Value:</Label>
            <Value>{transaction.value_cents}</Value>
          </div>
          <div>
            <Label>Date:</Label>
            <Value>{transaction.date}</Value>
          </div>
        </Wrapper>
        <Link to={`/account/${transaction.account_id}`} className="btn btn-link">
          Back to Account
        </Link>
      </div>
    </div >
  );
};

export default Transaction;
