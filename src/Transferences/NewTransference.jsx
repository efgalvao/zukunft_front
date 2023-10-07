import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import transferenceServiceInstance from "../services/transferece.service";
import accountService from "../services/account.service";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomButton, FunctionButton } from "../Common/Buttons";

import Modal from '../Common/Modal';

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

const NewTransference = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    sender: '',
    receiver: '',
    value: '',
    date: ''
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    accountService.getAccountList().then((response) => {
      setAccounts(response.data);
    },
      error => {
        console.log(error)
      });
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleChange = (date) => {
    setSelectedDate(date);
    setFormValues(prevState => ({ ...prevState, date: date.toISOString().substring(0, 10) }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const body = {
      'transference': {
        'sender': formValues.sender,
        'receiver': formValues.receiver,
        'value': formValues.value,
        'date': formValues.date
      }
    };

    transferenceServiceInstance.createTransference(body).then((response) => {
      if (response.status === 201) {
        setIsModalOpen(false);
        handleTransferenceCreated();
      }
    },
      error => {
        console.log(error)
      }
    )
  };

  const handleTransferenceCreated = () => {
    window.location.reload();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button color="blue" onClick={handleOpenModal}>
        Criar transferência
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">
                Criar transferência
              </h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="transactionValue">Valor</label>
                  <input
                    type="number"
                    name="value"
                    value={formValues.value}
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sender">Remetente</label>
                  <select
                    type="text"
                    name="sender"
                    value={formValues.sender}
                    className="form-control"
                    required
                    onChange={onChange}>
                    <option key={0} value='choose'>Selecione</option>
                    {accounts.map((account) => (
                      <option key={account.attributes.id} value={account.attributes.id}>{account.attributes.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="receiver">Desrtinatário</label>
                  <select
                    type="text"
                    name="receiver"
                    value={formValues.receiver}
                    className="form-control"
                    required
                    onChange={onChange}>
                    <option key={0} value='choose'>Selecione</option>
                    {accounts.map((account) => (
                      <option key={account.attributes.id} value={account.attributes.id}>{account.attributes.name}</option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="date">Data</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleChange}
                    name="date"
                    className="form-control"
                    required
                    dateFormat="dd-MM-yyyy"
                  />
                </div>

                <CustomButton type="submit" buttonText="Criar Transferência" color="green" />
                <FunctionButton linkTo="/transferences" buttonText="Voltar" color="blue" onClick={handleCloseModal} />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewTransference;
