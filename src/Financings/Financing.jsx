import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import financingServiceInstance from "../services/financing.service";
import { LinkButton, FunctionButton } from '../Common/Buttons';
import FinancingSummary from "./FinancingSummary";
import NewInstallment from "./NewInstallment";

const Financing = () => {
  const { financingId } = useParams();

  const navigate = useNavigate();
  const [financing, setFinancing] = useState('');

  useEffect(() => {
    financingServiceInstance.getFinancing(financingId).then((response) => {
      if (response.status === 200) {
        setFinancing(response.data)
        return response.data;
      }
    }, error => {
      console.log("Network response was not ok." + error)
      navigate("/financings");
    });
  }, [financingId]
  );

  const handleDelete = () => {
    financingServiceInstance.deleteFinancing(financingId).then((response) => {
      if (response.status === 200) {
        navigate("/financings")
      }
    },
      error => {
        console.log("Network response was not ok." + error)
      }
    )
  };

  return (
    <div className="">
      <div className='title'>
        {financing.name}
      </div>
      <div className="buttons">
        <LinkButton linkTo={`/financings/${financingId}/installments`} buttonText="Pagamentos" color="green" />
        <NewInstallment financingId={financing.id} />
      </div>
      <div className="container py-2">
        <FinancingSummary financing={financing} />
      </div>
      <div className="container py-2">
        <FunctionButton buttonText="Remover Financiamento" color="red" onClick={handleDelete} type="button" />

        <LinkButton linkTo={'/financings'} buttonText="Voltar" color="blue" />
      </div>
    </div >
  );
};

export default Financing;
