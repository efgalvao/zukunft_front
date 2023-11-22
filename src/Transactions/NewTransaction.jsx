import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import transactionServiceInstance from "../services/transaction.service";
import categoryServiceInstance from "../services/category.service";
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

const NewTransactionModal = ({ id }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    title: '',
    category_id: '',
    kind: '',
    value: '',
    date: ''
  });

  const [categories, setCategories] = useState([]);

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
      'transaction': {
        'account_id': id,
        'title': formValues.title,
        'category_id': formValues.category_id,
        'kind': formValues.kind,
        'value': formValues.value,
        'date': formValues.date
      }
    };

    transactionServiceInstance.createTransaction(body).then((response) => {
      if (response.status === 201) {
        setIsModalOpen(false);
        handleTransactionCreated()
      }
    },
      error => {
        console.log(error)
      }
    )
  };

  useEffect(() => {
    categoryServiceInstance.getCategoryList().then((response) => {
      if (response.status === 200) {
        setCategories(response.data)
      }
    },
      error => {
        console.log("Network response was not ok.")
        navigate("/");
      });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTransactionCreated = () => {
    window.location.reload();
  };

  return (
    <>
      <Button color="blue" onClick={handleOpenModal}>
        Nova transação
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="container mt-3">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-3">
                Nova transação
              </h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="transactionTitle">Titulo: </label>
                  <input
                    type="text"
                    name="title"
                    value={formValues.title}
                    id="transactionTitle"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionValue">Valor: </label>
                  <input
                    type="text"
                    name="value"
                    value={formValues.value}
                    id="transactionValue"
                    className="form-control"
                    required
                    pattern="[0-9]+(\.[0-9]+)?"
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionKind">Tipo de transação</label>
                  <select
                    type="text"
                    name="kind"
                    id="transactionKind"
                    value={formValues.kind}
                    className="form-control"
                    required
                    onChange={onChange}>
                    <option value="income">Entrada</option>
                    <option value="expense">Saída</option>
                    <option value="" disabled hidden>Selecione uma opção</option>

                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="transactionCategory">Categoria da transação</label>
                  <select
                    type="text"
                    name="category_id"
                    id="transactionCategory"
                    value={formValues.category_id}
                    className="form-control"
                    required
                    onChange={onChange}>
                    <option value="" disabled hidden>Selecione uma categoria</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.attributes.name}</option>
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

                <CustomButton type="submit" buttonText="Criar Transação" color="green" />
                <FunctionButton linkTo={'/cards'} buttonText="Voltar" color="blue" onClick={handleCloseModal} />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewTransactionModal;
