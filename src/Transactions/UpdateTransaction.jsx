import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TransactionService from '../services/transaction.service';

function UpdateTransaction() {
  const navigate = useNavigate();
  const location = useLocation();

  const original = location.state.transaction;
  const [transaction, setTransaction] = useState(original);

  const onSubmit = (event) => {
    event.preventDefault();

    const payload = {
      'id': transaction.id,
      'transaction': {
        'title': transaction.title,
        'date': transaction.date,
        'category_id': transaction.category_id
      }
    };

    TransactionService.updateTransaction(payload)
      .then((response) => {
        navigate(`/account/${response.data.account_id}`)
      }, error => {
        console.log(error)
      })
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setTransaction(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <h1>Edit Transaction</h1>
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={transaction.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Category:
          <select name="category_id" value={transaction.category_id} onChange={handleChange}>
            <option value="1">Income</option>
            <option value="2">Expense</option>
          </select>
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update Transaction</button>
      </form>
    </div>
  );

}

export default UpdateTransaction;
