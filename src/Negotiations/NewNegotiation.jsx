import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import negotiationServiceInstance from "../services/negotiation.service";
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


const NewNegotiation = ({ parentKind, parentId }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    value: '',
    date: '',
    kind: '',
    shares: ''
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
      'negotiation': {
        'parent_kind': parentKind,
        'parent_id': parentId,
        'date': formValues.date,
        'value': formValues.value,
        'kind': formValues.kind,
        'shares': formValues.shares
      }
    };

    negotiationServiceInstance.createNegotiation(body).then((response) => {
      if (response.status === 201) {
        setIsModalOpen(false);
        handleNegotiationCreated()
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

  const handleNegotiationCreated = () => {
    window.location.reload();
  }


  return (
    <>
      <Button color="blue" onClick={handleOpenModal}>
        Nova Negociação
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="container mt-3">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-3">
                Novo Negociação
              </h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="transactionTitle">Preço: </label>
                  <input
                    type="text"
                    name="value"
                    value={formValues.valueCents}
                    id="dividendValue"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionTitle">Cotas: </label>
                  <input
                    type="text"
                    name="shares"
                    value={formValues.shares}
                    id="negotiationValue"
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

                <div className="form-group">
                  <label htmlFor="accountKind">Compra ou Venda ?/label</label>
                  <select
                    type="text"
                    name="kind"
                    value={formValues.kind}
                    className="form-control"
                    required
                    onChange={onChange}>
                    <option value="" disabled>Escolha uma ação</option>
                    <option value="buy">Compra</option>
                    <option value="sell">Venda</option>
                  </select>
                </div>

                <CustomButton type="submit" buttonText="Registrar preço" color="green" />
                <FunctionButton linkTo={`/stock/${parentId}}`} buttonText="Voltar" color="blue" onClick={handleCloseModal} />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewNegotiation;
