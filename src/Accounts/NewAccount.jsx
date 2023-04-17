import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountService from "../services/account.service";

const NewAccount = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    balance: '',
    kind: 'savings'
  });

  const onChange = (event, setFunction) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();


    const body = { 'account': { 'name': formValues.name, 'kind': formValues.kind, 'balance_cents': formValues.balance } };

    AccountService.createAccount(body).then((response) => {
      if (response.status === 201) {
        console.log(response.data)
        navigate(`/accounts/${response.data.id}`)
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
            Add a new account.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="accountName">Account name</label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                id="accountName"
                className="form-control"
                required
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="accountBalance">Account balance</label>
              <input
                type="number"
                name="balance"
                // id="accountBalance"
                value={formValues.balance}
                className="form-control"
                required
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="accountKind">Account kind</label>
              <select
                type="text"
                name="kind"
                value={formValues.kind}
                // id="accountKind"
                className="form-control"
                required
                onChange={onChange}>
                <option value="savings">Savings</option>
                <option value="broker">Broker</option>
                <option value="card">Card</option>
              </select>
            </div>

            <button type="submit" className="btn custom-button mt-3">
              Create Account
            </button>
            <Link to="/accounts" className="btn btn-link mt-3">
              Back to accounts
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAccount;
