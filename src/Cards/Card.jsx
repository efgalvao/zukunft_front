import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardService from "../services/card.service";
import styled from 'styled-components';
import { LinkButton } from '../Common/Buttons';

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

const Card = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState('');

  useEffect(() => {
    CardService.getCard(params.id).then((response) => {
      console.log(response)
      if (response.status === 200) {
        setCard(response.data)
        return response.data;
      }
    }, error => {
      console.log("Network response was not ok.")
      navigate("/accounts");
    });
  }, [params.id]);

  const deleteCard = () => {
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
      <div>
        <Title>{card.name}</Title>
      </div>
      <div className="container py-5">
        <Wrapper>
          <div>
            <Label>Kind:</Label>
            <Value>{card.kind}</Value>
          </div>
          <div>
            <Label>Balance:</Label>
            <Value>{card.balance_cents}</Value>
          </div>
          <div>
            <Label>Date:</Label>
            <Value>{card.date}</Value>
          </div>
        </Wrapper>
        <div className="row">
          <div className="col-sm-12 col-lg-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteCard}
            >
              Delete Card
            </button>
          </div>
        </div>
        <LinkButton to='cards' color='blue' buttonText='Back to Cards' />
      </div>
    </div>
  );
};

export default Card;
