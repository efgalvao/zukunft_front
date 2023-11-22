import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import installmentServiceInstance from "../services/installment.service";
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


const NewInstallment = ({ financingId }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    ordinary: '',
    paymentDate: '',
    parcels: '',
    paidParcels: '',
    amortization: '',
    interest: '',
    insurance: '',
    fees: '',
    adjustment: '',
    monetaryCorrection: ''
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormValues(prevState => ({ ...prevState, paymentDate: date.toISOString().substring(0, 10) }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const data = {
      'installment': {
        'financing_id': financingId,
        'ordinary': formValues.ordinary,
        'parcel': formValues.parcel,
        'paid_parcels': formValues.paidParcels,
        'payment_date': formValues.paymentDate,
        'amortization': formValues.amortization,
        'interest': formValues.interest,
        'insurance': formValues.insurance,
        'fees': formValues.fees,
        'adjustment': formValues.adjustment,
        'monetary_correction': formValues.monetaryCorrection
      }
    };

    installmentServiceInstance.createInstallment(financingId, data).then((response) => {
      if (response.status === 201) {
        setIsModalOpen(false);
        handleInstallmentCreated()
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

  const handleInstallmentCreated = () => {
    window.location.reload();
  }

  return (
    <>
      <Button color="blue" onClick={handleOpenModal}>
        Novo Pagamento
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="container mt-3">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-3">
                Novo Pagamento
              </h1>
              <form onSubmit={onSubmit}>

                <div className="form-group">
                  <label htmlFor="transactionKind">Tipo de pagamento</label>
                  <select
                    type="text"
                    name="ordinary"
                    id="ordinary"
                    value={formValues.ordinary}
                    className="form-control"
                    required
                    onChange={onChange}>
                    <option value="true">Parcela</option>
                    <option value="false">Amortização</option>
                    <option value="" disabled hidden>Selecione uma opção</option>

                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="transactionTitle">Data de pagamento: </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    name="paymentDate"
                    className="form-control"
                    required
                    dateFormat="dd-MM-yyyy"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionTitle">Parcela: </label>
                  <input
                    type="text"
                    name="parcel"
                    value={formValues.parcel}
                    id="parcel"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionTitle">Parcelas amortizadas: </label>
                  <input
                    type="number"
                    name="paidParcels"
                    value={formValues.paidParcels}
                    id="paidParcels"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionTitle">Amortização: </label>
                  <input
                    type="text"
                    name="amortization"
                    value={formValues.amortization}
                    id="amortization"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionTitle">Juros: </label>
                  <input
                    type="text"
                    name="interest"
                    value={formValues.interest}
                    id="interest"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionTitle">Seguro: </label>
                  <input
                    type="text"
                    name="insurance"
                    value={formValues.insurance}
                    id="insurance"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionTitle">Taxas: </label>
                  <input
                    type="text"
                    name="fees"
                    value={formValues.fees}
                    id="fees"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionTitle">Outros valores: </label>
                  <input
                    type="text"
                    name="adjustment"
                    value={formValues.adjustment}
                    id="adjustment"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionTitle">Correção monetária(TR): </label>
                  <input
                    type="text"
                    name="monetaryCorrection"
                    value={formValues.monetaryCorrection}
                    id="monetaryCorrection"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <CustomButton type="submit" buttonText="Registrar Pagamento" color="green" />
                <FunctionButton linkTo={`/financings/financings/${financingId}}`} buttonText="Voltar" color="blue" onClick={handleCloseModal} />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewInstallment;
