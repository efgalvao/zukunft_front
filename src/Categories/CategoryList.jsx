import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import categoryServiceInstance from "../services/category.service";
import Card from "./CardWrapper";
import { LinkButton } from "../Common/Buttons";
import NewCategory from "./NewCategory";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryServiceInstance.getCategoryList().then((response) => {
      if (response.status === 200) {
        setCategories(response.data)
        return response.data;
      }
    },
      error => {
        console.log("Network response was not ok.")
        navigate("/");
      });
  }, []);

  const allCategories = categories.map((category, index) => (
    <div key={index} className="col-lg-3">
      <Card data={category} />
    </div>
  ));
  const noCategory = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        Não há categorias cadastradas.
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-1">
          <h1 className="display-4">Categorias</h1>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <NewCategory />
          </div>
          <div className="row">
            {categories.length > 0 ? allCategories : noCategory}
          </div>
          <LinkButton linkTo="/" buttonText="Voltar" color="blue" />
        </main>
      </div>
    </>
  );
};

export default CategoryList;
