import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import transferenceServiceInstance from "../services/transferece.service";
import Statement from "./StatementWrapper";
import { LinkButton } from "../Common/Buttons";
import NewTransference from "./NewTransference";

const TransferenceList = () => {
  const navigate = useNavigate();
  const [pastTransferences, setPastTransferences] = useState([]);
  const [futureTransferences, setFutureTransferences] = useState([]);

  useEffect(() => {
    transferenceServiceInstance.getTransferenceList().then((response) => {
      if (response.status === 200) {
        setPastTransferences(response.data.past_transferences);
        setFutureTransferences(response.data.future_transferences);
        return response.data;
      }
    },
      error => {
        console.log("Network response was not ok.")
        navigate("/");
      });
  }, [navigate]);

  const pastTransferencesTab = (
    <div>
      <Statement transferences={pastTransferences} />
    </div>
  );
  const futureTransferencesTab = (
    <div>
      <Statement transferences={futureTransferences} />
    </div>
  );
  const noTransference = (
    <div className="vh-50 d-flex align-items-center justify-content-center">
      <h4>
        Não há transferências cadastradas.
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
            <div className="col-12">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button className="nav-link active" id="nav-past-tab" data-bs-toggle="tab" data-bs-target="#nav-past" type="button" role="tab" aria-controls="nav-past" aria-selected="true">Transferências</button>
                  <button className="nav-link" id="nav-future-tab" data-bs-toggle="tab" data-bs-target="#nav-future" type="button" role="tab" aria-controls="nav-future" aria-selected="false">Transferências agendadas</button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-past" role="tabpanel" aria-labelledby="nav-past-tab">
                  {pastTransferences.length > 0 ? pastTransferencesTab : noTransference}
                </div>
                <div className="tab-pane fade" id="nav-future" role="tabpanel" aria-labelledby="nav-future-tab">
                  {futureTransferences.length > 0 ? futureTransferencesTab : noTransference}
                </div>
              </div>
            </div>          </div>
          <LinkButton linkTo={`/`} buttonText="Voltar" color="blue" />
        </main>
      </div>
    </>
  );
};

export default TransferenceList;
