import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import transferenceServiceInstance from "../services/transferece.service";
import Statement from "./StatementWrapper";
import { LinkButton } from "../Common/Buttons";

const TransferenceList = () => {
  const navigate = useNavigate();
  const [transferences, setTransferences] = useState([]);

  useEffect(() => {
    transferenceServiceInstance.getTransferenceList().then((response) => {
      if (response.status === 200) {
        console.log(response.data)
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
        No transferences yet. Why not <Link to="/transference">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-1">
          <h1 className="display-4">Transferences</h1>
          <p className="lead text-muted">
            Here are all your transferences.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <LinkButton linkTo="/transference" buttonText="Create New Transference" color="green" />
          </div>
          <div className="row">
            {transferences.length > 0 ? allTransferences : noTransference}
          </div>
          <LinkButton linkTo={`/`} buttonText="Back to Home" color="blue" />
        </main>
      </div>
    </>
  );
};

export default TransferenceList;
