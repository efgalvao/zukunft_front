import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import stockServiceInstance from "../services/stock.service";
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

const Stock = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState('');

  useEffect(() => {
    stockServiceInstance.getStock(params.stockId).then((response) => {
      if (response.status === 200) {
        setStock(response.data)
        return response.data;
      }
    }, error => {
      console.log("Network response was not ok.")
      navigate("/accounts");
    });
  }, [Stock]);

  return (
    <div className="">
      <div>
        <Title>{stock.ticker}</Title>
      </div>
      <div className="container py-1">
        <Wrapper>
          <div>
            <Label>Kind:</Label>
            <Value>{stock.ticker}</Value>
          </div>
          <div>
            <Label>Value:</Label>
            <Value>{stock.ticker}</Value>
          </div>
          <div>
            <Label>Date:</Label>
            <Value>{stock.ticker}</Value>
          </div>
        </Wrapper>
        <Link to={`/account/${stock.account_id}`} className="btn btn-link">
          Back to Account
        </Link>
      </div>
    </div >
  );
};

export default Stock;
