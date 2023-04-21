import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionService from "../services/transaction.service";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NewTransaction = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    value: '',
    kind: 'expense',
    date: '',
    category_id: ''
  });
  const [selectedDate, setSelectedDate] = useState(null);


  const onChange = (event, setFunction) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleChange = (date) => {
    setSelectedDate(date);
    setFormValues(prevState => ({ ...prevState, date: date.toISOString().substring(0, 10) }));
  };

  const onSubmit = (event) => {
    event.preventDefault();


    const body = { 'transaction': { 'title': formValues.title, 'kind': formValues.kind, 'value_cents': formValues.value, 'date': formValues.date, 'category_id': formValues.category } };

    TransactionService.createTransaction(body).then((response) => {
      if (response.status === 201) {
        console.log(response.data)
        navigate(`/transactions/${response.data.id}`)
      }
    },
      error => {
        console.log(error)
      }
    )
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new transaction.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="transactionTitle">Transaction title</label>
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
              <label htmlFor="transactionValue">Transaction Value</label>
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
              <label htmlFor="transactionKind">Kind of transaction</label>
              <select
                type="text"
                name="kind"
                value={formValues.kind}
                className="form-control"
                required
                onChange={onChange}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date of transaction</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                name="date"
                className="form-control"
                required
                dateFormat="dd-MM-yyyy"
              />
            </div>

            <button type="submit" className="btn custom-button mt-3">
              Create Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTransaction;
