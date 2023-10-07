import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import transferenceServiceInstance from "../services/transferece.service";
import Statement from "./StatementWrapper";
import { LinkButton } from "../Common/Buttons";
import NewTransference from "./NewTransference";

const TransferenceList = () => {
  const navigate = useNavigate();
  const [transferences, setTransferences] = useState([]);

  useEffect(() => {
    transferenceServiceInstance.getTransferenceList().then((response) => {
      if (response.status === 200) {
        setTransferences(response.data)
        return response.data;
      }
    },
      error => {
        console.log("Network response was not ok.")
        navigate("/");
      });
  }, [navigate]);

  const allTransferences = (
    <div>
      <Statement transferences={transferences} />
    </div>
  );
  const noTransference = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        Ainda nào há transferências cadastradas.
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-1">
          <h1 className="display-4">Transferências</h1>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
          <NewTransference />
            </div>
          <div className="row">
            {transferences.length > 0 ? allTransferences : noTransference}
          </div>
          <LinkButton linkTo={`/`} buttonText="Voltar" color="blue" />
        </main>
      </div>
    </>
  );
};

export default TransferenceList;
