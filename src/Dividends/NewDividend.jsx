import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dividendServiceInstance from "../services/dividend.service";
import 'react-datepicker/dist/react-datepicker.css';
import { CustomButton, FunctionButton } from "../Common/Buttons";
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


const NewDividend = ({ stockId }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    valueCents: '',
    date: ''
  });

  const [selectedDate, setSelectedDate] = useState(null);

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
      'dividends': {
        'stock_id': stockId,
        'date': formValues.date,
        'value_cents': formValues.valueCents
      }
    };

    dividendServiceInstance.createDividend(body).then((response) => {
      if (response.status === 201) {
        setIsModalOpen(false);
        handleDividendCreated()
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

  const handleDividendCreated = () => {
    window.location.reload();
  }

  return (
    <>
      <Button color="blue" onClick={handleOpenModal}>
        Novo Dividendo
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="container mt-3">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-3">
                Novo dividendo
              </h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="transactionTitle">Valor: </label>
                  <input
                    type="number"
                    name="valueCents"
                    value={formValues.valueCents}
                    id="dividendValue"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
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

                <CustomButton type="submit" buttonText="Criar dividendo" color="green" />
                <FunctionButton linkTo={`/stock/${stockId}}`} buttonText="Voltar" color="blue" onClick={handleCloseModal} />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewDividend;
