import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import stockServiceInstance from "../services/stock.service";
import styled from 'styled-components';
import { LinkButton } from '../Common/Buttons';

import DividendChart from "../Dividends/DividendChart";
import PriceChart from "../Prices/PriceChart";
import NegotiationList from "./NegotiationList";
import DividendList from "./DividendList";
import PriceList from "./PriceList";
import NewDividend from "../Dividends/NewDividend";
import NewPrice from "../Prices/NewPrice";

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
    return (stock.invested_value_cents / 100).toFixed(2) / stock.shares_total || 0
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
      <div className="container py-3">
        <NewDividend stockId={params.stockId} />
        <NewPrice stockId={params.stockId} />
      </div>
      <div>
        <Wrapper>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Valor investido:</th>
                <th>Valor investido por cota:</th>
                <th>Valor total atual</th>
                <th>Valor atual por cota:</th>
                <th>Quantitade de cotas:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{`$ ${(stock.invested_value_cents / 100).toFixed(2)} `}</td>
                <td>$ {valuePerShare(stock)}</td>
                <td>{`$ ${(stock.current_total_value_cents / 100).toFixed(2)} `}</td>
                <td>{`$ ${(stock.current_value_cents / 100).toFixed(2)} `}</td>
                <td>{stock.shares_total}</td>
              </tr>
            </tbody>
          </table >

        </Wrapper>
        {stock.attributes?.dividends.length > 0 && (
          <>
            <DividendList dividends={stock.attributes.dividends} />
            <DividendChart dividends={stock.attributes.dividends} />
          </>
        )
        }
        {stock.prices && stock.prices.length > 0 &&
          <PriceChart prices={stock.prices} />
        }
        {stock.negotiations && stock.negotiations.length > 0 &&
          <NegotiationList negotiations={stock.negotiations} />
        }

        <div className="container py-3">
          <LinkButton linkTo={`/account/${stock.account_id}`} buttonText="Ir para conta" color="blue" />
        </div>
      </div>
    </div >
  );
};

export default Stock;
