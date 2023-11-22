import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import stockServiceInstance from "../services/stock.service";
import 'react-datepicker/dist/react-datepicker.css';
import { CustomButton, FunctionButton } from "../Common/Buttons";

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


const UpdateStock = ({ accountId, accountName }) => {

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    ticker: '',
    account_id: ''
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const body = {
      'stock': {
        'ticker': formValues.ticker,
        'account_id': accountId
      }
    };

    stockServiceInstance.createStock(body).then((response) => {
      if (response.status === 201) {
        navigate(`/account/${accountId}`)
      }
    },
      error => {
        console.log(error)
      }
    )
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
        Nova Ação
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="container mt-3">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-3">
                Update Stock
              </h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="transactionTitle">Stock Ticker</label>
                  <input
                    type="text"
                    name="ticker"
                    value={formValues.ticker}
                    id="stockTicker"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionTitle">Account</label>
                  <input
                    type="text"
                    name="accountId"
                    value={accountName}
                    id="stockTicker"
                    className="form-control"
                    required
                    onChange={onChange}
                    disabled
                  />
                </div>

                <CustomButton type="submit" buttonText="Update Stock" color="green" />
                <FunctionButton linkTo={`/account/${accountId}}`} buttonText="Back to Account" color="blue" onClick={handleCloseModal} />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateStock;
