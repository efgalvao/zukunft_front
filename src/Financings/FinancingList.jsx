import React, { useState, useEffect } from 'react';
import financingServiceInstance from '../services/financing.service';
import Statement from "./StatementWrapper";
import { LinkButton } from '../Common/Buttons';

function FinancingList() {
  const [financings, setFinancings] = useState([]);

  useEffect(() => {
    async function fetchFinancings() {
      const fetchedFinancings = await financingServiceInstance.getFinancingsList();
      setFinancings(fetchedFinancings['data']);
    }
    fetchFinancings();
  }, []);

  const allFinancings = (
    <div>
      <Statement financings={financings} />
    </div>
  );

  const noFinancing = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        Nenhum investimento encontrado.
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-1">
          <h1 className="display-4">Investimentos</h1>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="mb-3">
          </div>
          <div className="row">
            {financings.length > 0 ? allFinancings : noFinancing}
          </div>
        </main>
      </div>
      <LinkButton linkTo="/" buttonText="Home" color="green" />
    </>
  );
};
export default FinancingList;
