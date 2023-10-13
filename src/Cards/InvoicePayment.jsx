import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cardServiceInstance from "../services/card.service";
import accountService from "../services/account.service";
import { CustomButton, FunctionButton } from "../Common/Buttons";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import Modal from './Modal';

import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.color || 'green'};
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 10px 10px 0 0;
`;

const InvoicePayment = () => {
  const [cards, setCards] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    account_id: '',
    card_id: '',
    value: '',
    description: '',
    date: ''
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const body = {
      'invoice_payment': {
        'account_id': formValues.account_id,
        'card_id': formValues.card_id,
        'value': formValues.value,
        'description': formValues.description,
        'date': formValues.date
      }
    };

    cardServiceInstance.invoicePayment(body).then((response) => {
      if (response.status === 201) {
        setIsModalOpen(false);
        handlePaymentCreated()
      }
    },
      error => {
        console.log(error)
      }
    )
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
    setFormValues(prevState => ({ ...prevState, date: date.toISOString().substring(0, 10) }));
  };

  useEffect(() => {
    accountService.getAccountList().then((response) => {
      setAccounts(response.data);
    },
      error => {
        console.log(error)
      });
    cardServiceInstance.getCardList().then((res) => {
      if (res.status === 200) {
        setCards(res.data)
      }
    },
      error => {
        console.log(error)
      });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePaymentCreated = () => {
    window.location.reload();
  };

  return (
    <>
      <Button color="blue" onClick={handleOpenModal}>
        Pagar fatura de cartão
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">
                Pagar fatura de cartão
              </h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="cardName" className="text-left">Descrição: </label>
                  <input
                    type="text"
                    name="description"
                    value={formValues.description}
                    id="cardName"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cardBalance" className="text-left">Valor: </label>
                  <input
                    type="text"
                    name="value"
                    value={formValues.value}
                    id="cardBalance"
                    className="form-control"
                    required
                    pattern="[0-9]+(\.[0-9]+)?"
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionCategory">Conta:</label>
                  <select
                    type="text"
                    name="account_id"
                    id="transactionCategory"
                    value={formValues.account_id}
                    className="form-control"
                    required
                    onChange={onChange}>
                    <option value="" disabled hidden>Selecione a conta</option>
                    {accounts.map(account => (
                      <option key={account.id} value={account.id}>{account.attributes.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="transactionCategory">Cartão:</label>
                  <select
                    type="text"
                    name="card_id"
                    id="transactionCategory"
                    value={formValues.card_id}
                    className="form-control"
                    required
                    onChange={onChange}>
                    <option value="" disabled hidden>Selecione o cartão</option>
                    {cards.map(card => (
                      <option key={card.id} value={card.id}>{card.attributes.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="transactionTitle">Data: </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleChange}
                    name="date"
                    className="form-control"
                    required
                    dateFormat="dd-MM-yyyy"
                  />
                </div>

                <CustomButton type="submit" buttonText="Pagar fatura" color="green" />
                <FunctionButton linkTo={'/cards'} buttonText="Voltar" color="blue" onClick={handleCloseModal} />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InvoicePayment;
