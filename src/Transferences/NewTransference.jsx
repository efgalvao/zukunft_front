import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import transferenceServiceInstance from "../services/transferece.service";
import accountService from "../services/account.service";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomButton, LinkButton } from "../Common/Buttons";

const NewTransference = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    sender: '',
    receiver: '',
    value: '',
    date: ''
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    accountService.getAccountList().then((response) => {
      console.log(response);
      setAccounts(response.data);
    },
      error => {
        console.log(error)
      });
  }, []);

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
      'transference': {
        'sender': formValues.sender,
        'receiver': formValues.receiver,
        'value': formValues.value,
        'date': formValues.date
      }
    };

    transferenceServiceInstance.createTransference(body).then((response) => {
      if (response.status === 201) {
        navigate("/transferences")
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
            Add a new transference.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="transactionValue">Transference Value</label>
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
              <label htmlFor="sender">Sender Account</label>
              <select
                type="text"
                name="sender"
                value={formValues.sender}
                className="form-control"
                required
                onChange={onChange}>
                <option key={0} value='choose'>Choose Account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>{account.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="receiver">Receiver Account</label>
              <select
                type="text"
                name="receiver"
                value={formValues.receiver}
                className="form-control"
                required
                onChange={onChange}>
                <option key={0} value='choose'>Choose Account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>{account.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date of transference</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                name="date"
                className="form-control"
                required
                dateFormat="dd-MM-yyyy"
              />
            </div>

            <CustomButton type="submit" buttonText="Create Transference" color="green" />
            <LinkButton linkTo="/transferences" buttonText="Back to Transferences" color="blue" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTransference;
