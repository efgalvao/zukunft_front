import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import priceServiceInstance from "../services/prices.service";
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


const NewPrice = ({ parentId, parentKind }) => {
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
      'price': {
        'parent_kind': parentKind,
        'parent_id': parentId,
        'date': formValues.date,
        'value': formValues.valueCents
      }
    };

    priceServiceInstance.createPrice(body).then((response) => {
      if (response.status === 201) {
        setIsModalOpen(false);
        handlePriceCreated()
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

  const handlePriceCreated = () => {
    window.location.reload();
  };

  return (
    <>
      <Button color="blue" onClick={handleOpenModal}>
        Novo Preço
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="container mt-3">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-3">
                Novo preço
              </h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="transactionTitle">Preço: </label>
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

                <CustomButton type="submit" buttonText="Registrar preço" color="green" />
                <FunctionButton linkTo={`/${parentKind}/${parentId}}`} buttonText="Voltar" color="blue" onClick={handleCloseModal} />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewPrice;
