import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import stockServiceInstance from "../services/stock.service";
import styled from 'styled-components';
import { LinkButton } from '../Common/Buttons';

import DividendChart from "../Dividends/DividendChart";
import PriceChart from "./PriceChart";
import NegotiationList from "./NegotiationList";
import NewDividend from "../Dividends/NewDividend";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
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

  const valuePerShare = (stock) => {
    return stock.invested_value_cents / stock.shares_total || 0
  };

  const formattedDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };

    const formattedDateString = date.toLocaleDateString('pt-BR', options);

    return `${formattedDateString}`;
  };

  useEffect(() => {
    stockServiceInstance.getStock(params.stockId).then((response) => {
      if (response.status === 200) {
        setStock(response.data)
        return response.data;
      }
    }, error => {
      console.log("Network response was not ok.")
      navigate("/stocks");
    });
  }, [Stock]);

  return (
    <div className="">
      <div className="subtitle">
        <Title>{stock.ticker}</Title>
      </div>
      <div className="container py-1">
        <NewDividend stockId={params.stockId} />
        <Wrapper>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Valor investido:</th>
                <th>Valor investido por cota:</th>
                <th>Valor total atual</th>
                <th>Valor atual por cota:</th>
                <th>Ultima atualizacao:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{`$ ${(stock.invested_value_cents / 100).toFixed(2)} `}</td>
                <td>$ {valuePerShare(stock)}</td>
                <td>{`$ ${(stock.current_total_value_cents / 100).toFixed(2)} `}</td>
                <td>{`$ ${(stock.current_value_cents / 100).toFixed(2)} `}</td>
                <td>{formattedDate(new Date(stock.updated_at))}</td>
              </tr>
            </tbody>
          </table >

        </Wrapper>
        {stock.dividends && stock.dividends.length > 0 &&
          <DividendChart dividends={stock.dividends} />
        }
        {stock.prices && stock.prices.length > 0 &&
          <PriceChart prices={stock.prices} />
        }
        {stock.negotiations && stock.negotiations.length > 0 &&
          <NegotiationList negotiations={stock.negotiations} />
        }

        <LinkButton linkTo={`/account/${stock.account_id}`} buttonText="Ir para conta" color="blue" />
      </div>
    </div >
  );
};

export default Stock;
