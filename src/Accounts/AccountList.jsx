import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountService from "../services/account.service";
import Card from "./CardWrapper";
import { LinkButton } from '../Common/Buttons';
import NewAccount from "./NewAccount";

const AccountList = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    AccountService.getAccountList().then((res) => {
      if (res.status === 200) {
        setAccounts(res.data)
      }
    },
      error => {
        console.log("Network response was not ok.")
        navigate("/");
      });
  }, []);

  const allAccounts = accounts.map((account, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <Card data={account} />
    </div>
  ));
  const noAccount = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        Nenhuma conta cadastrada. Criar uma <Link to="/account">conta</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-1">
          <h1 className="display-4">Contas</h1>
          <p className="lead text-muted">
            Contas em bancos e corretoras.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="mb-3">
            <NewAccount />
          </div>
          <div className="row">
            {accounts.length > 0 ? allAccounts : noAccount}
          </div>
          <LinkButton linkTo="/" buttonText="Home" color="green" />
        </main>
      </div>
    </>
  );
};

export default AccountList;
