import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionService from '../services/transaction.service';
import categoryServiceInstance from "../services/category.service";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Modal from './Modal';
import styled from 'styled-components';
import { CustomButton, FunctionButton } from "../Common/Buttons";

const Button = styled.button`
  background-color: ${props => props.color || 'green'};
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 10px 10px 0 0;
`;

const UpdateTransaction = ({ transaction }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    title: transaction.title,
    category_id: transaction.category_id,
    date: transaction.date
  });

  const [categories, setCategories] = useState([]);


  const [selectedDate, setSelectedDate] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    const payload = {
      'id': transaction.id,
      'account_id': transaction.account_id,
      'transaction': {
        'title': formValues.title,
        'date': formValues.date,
        'category_id': formValues.category_id
      }
    };

    TransactionService.updateTransaction(payload)
      .then((response) => {
        setIsModalOpen(false);
        window.location.reload();
      }, error => {
        console.log(error)
      })
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleChange = (date) => {
    setSelectedDate(date);
    setFormValues(prevState => ({ ...prevState, date: date.toISOString().substring(0, 10) }));
  };

  useEffect(() => {
    categoryServiceInstance.getCategoryList().then((response) => {
      if (response.status === 200) {
        setCategories(response.data)
        return response
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

  return (
    <>
      <Button color="blue" onClick={handleOpenModal}>
        Editar
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">
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
                    dateFormat="dd-MM-yyyy"
                  />
                </div>

                <CustomButton type="submit" buttonText="Atualizar Transação" color="green" />
                <FunctionButton linkTo={'/cards'} buttonText="Voltar" color="blue" onClick={handleCloseModal} />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );

}

export default UpdateTransaction;
