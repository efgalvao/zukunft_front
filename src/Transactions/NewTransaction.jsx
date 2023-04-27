import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransactionService from "../services/transaction.service";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomButton, LinkButton } from "../Common/Buttons";

const NewTransaction = () => {
  const params = useParams();
  const accountId = params.accountId;
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    value: '',
    kind: 'expense',
    date: '',
    category_id: ''
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
      'transaction': {
        'title': formValues.title,
        'kind': formValues.kind,
        'value': formValues.value,
        'date': formValues.date,
        'category_id': formValues.category,
        'account_id': accountId
      }
    };

    TransactionService.createTransaction(accountId, body).then((response) => {
      if (response.status === 201) {
        navigate(`/accounts/${accountId}/transactions`)
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

            <CustomButton type="submit" buttonText="Create Transaction" color="green" />
            <LinkButton linkTo={`/account/${params.accountId}`} buttonText="Back to Account" color="blue" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTransaction;
