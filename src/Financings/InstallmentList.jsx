import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import installmentServiceInstance from "../services/installment.service";
import { LinkButton } from "../Common/Buttons";
import InstallmentsWrapper from "./InstallmentsWrapper";

const InstallmentList = () => {
  console.log("InstallmentList")
  const navigate = useNavigate();
  const [installments, setInstallments] = useState([]);
  const { financingId } = useParams();

  useEffect(() => {
    installmentServiceInstance.getInstallmentList(financingId).then((res) => {
      if (res.status === 200) {
        setInstallments(res.data);
        return res.data;
      }
    },
      error => {
        console.log("Network response was not ok.")
        navigate("/");
      });
  }, [financingId]);

  const allInstallments = (
    <div>
      <InstallmentsWrapper installments={installments} />
    </div>
  );

  const noInstallment = (
    <div className="vh-50 d-flex align-items-center justify-content-center">
      <h4>
        Não há pagamentos.
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-1">
          <h1 className="display-4">Pagamentos</h1>

        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
          </div>
          <div className="row">
            {installments.length > 0 ? allInstallments : noInstallment}
          </div>
          <LinkButton linkTo={`/financings/${financingId}`} buttonText="Voltar" color="blue" />
        </main>
      </div>
    </>
  );
};

export default InstallmentList;
