import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import treasuryServiceInstance from "../services/treasury.service";
import styled from 'styled-components';
import { LinkButton } from '../Common/Buttons';
import UpdateTreasury from "./UpdateTreasury";

import PriceChart from "../Prices/PriceChart";
import NegotiationList from "./NegotiationList";
import PriceList from "./PriceList";
import NewPrice from "../Prices/NewPrice";
import NewNegotiation from "../Negotiations/NewNegotiation";

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

const Treasury = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [treasury, setTreasury] = useState('');

  const valuePerShare = (treasury) => {
    return (treasury.attributes?.invested_value_cents / 100).toFixed(2) / treasury.attributes?.shares_total || 0
  };

  useEffect(() => {
    treasuryServiceInstance.getTreasury(params.treasuryId).then((response) => {
      if (response.status === 200) {
        setTreasury(response.data)
        return response.data;
      }
    }, error => {
      console.log("Network response was not ok.")
      navigate("/treasuries");
    });
  }, [Treasury]);

  return (
    <div className="">
      <div className="subtitle">
        <Title>{treasury.attributes?.name}</Title>
      </div>
      <div className="container py-3">
        {treasury && <UpdateTreasury treasury={treasury.attributes} />}
        <NewPrice parentKind="treasury" parentId={params.treasuryId} />
        <NewNegotiation parentKind="treasury" parentId={params.treasuryId} />
      </div>
      <div>
        <Wrapper>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Valor investido::</th>
                <th>Valor total atualizdo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{`$ ${(treasury.attributes?.invested_value_cents / 100).toFixed(2)} `}</td>
                <td>{`$ ${(treasury.attributes?.current_value_cents / 100).toFixed(2)} `}</td>
              </tr>
            </tbody>
          </table >

        </Wrapper>
        {treasury.attributes?.prices.length > 0 && (
          <>
            <PriceList prices={treasury.attributes.prices} />
            <PriceChart prices={treasury.attributes.prices} />
          </>
        )}

        {treasury.attributes?.negotiations.length > 0 &&
          <NegotiationList negotiations={treasury.attributes.negotiations} />
        }

        <div className="container py-3">
          <LinkButton linkTo={`/account/${treasury.attributes?.account_id}`} buttonText="Ir para conta" color="blue" />
        </div>
      </div>
    </div >
  );
};

export default Treasury;
