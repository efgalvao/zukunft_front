import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardService from "../services/card.service";
import { Wrapper, Label, Value, Title, SubTitle } from './styles';
import { LinkButton, FunctionButton } from '../Common/Buttons';

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
        <Title>{card.name}</Title>
        <div className="buttons">
          <LinkButton linkTo={`/cards/${card.id}/transactions`} buttonText="Transações" color="blue" />
          <LinkButton linkTo={`/cards/${card.id}/transaction`} buttonText="Nova Transação" color="green" />
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
              <td>{`$ ${(card.balance_cents / 100).toFixed(2)} `}</td>
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
                <td>{`$ ${(card.balance_cents / 100).toFixed(2)} `}</td>
                <td>{`$ ${(card.balance_cents / 100).toFixed(2)} `}</td>
                <td>{`$ ${(card.balance_cents / 100).toFixed(2)} `}</td>
              </tr>
            </tbody>
          </table >
        </Wrapper>

        <div className="container py-2">
          <FunctionButton buttonText="Apagar Cartão" color="red" onClick={handleDelete} type="button" />

          <LinkButton linkTo={'/cards'} buttonText="Voltar para Cartões" color="blue" />
        </div>
      </div>
    </div>
  );
};

export default Card;
