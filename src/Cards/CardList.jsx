import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardService from "../services/card.service";
import CardWrapper from "../Accounts/CardWrapper";
import { LinkButton } from '../Common/Buttons';

const CardList = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    CardService.getCardList().then((res) => {
      if (res.status === 200) {
        setCards(res.data)
        return res.data;
      }
    },
      error => {
        console.log("Network response was not ok.")
        navigate("/");
      });
  }, []);

  const allCards = cards.map((card, index) => (
    <div>
      <CardWrapper data={card} />
    </div>
  ));
  const noCard = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No cards yet. Why not <Link to="/card">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-1">
          <h1 className="display-4">Cards for every occasion</h1>
          <p className="lead text-muted">
            Here are all your cards.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <LinkButton linkTo="/card" buttonText="Create New Card" color="green" />
          </div>
          <div className="row">
            {cards.length > 0 ? allCards : noCard}
          </div>
          <LinkButton linkTo="/" buttonText="Home" color="blue" />
        </main>
      </div>
    </>
  );
};

export default CardList;
