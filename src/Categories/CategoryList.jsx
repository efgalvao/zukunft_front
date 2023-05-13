import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryService from "../services/category.service";
import Card from "./CardWrapper";
import { LinkButton } from "../Common/Buttons";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryService.getCategoryList().then((res) => {
      if (res.status === 200) {

        setCategories(res.data)
        return res.data;
      }
    },
      error => {
        console.log("Network response was not ok.")
        navigate("/");
      });
  }, []);

  const allCategories = categories.map((category, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <Card data={category} />
    </div>
  ));
  const noCategory = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No categories yet. Why not <Link to="/category">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-1">
          <h1 className="display-4">Categories for every occasion</h1>
          <p className="lead text-muted">
            We’ve pulled together our most popular categories, so there’s sure to be something
            tempting for you to try.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="row">
            {categories.length > 0 ? allCategories : noCategory}
          </div>
          <LinkButton linkTo="/" buttonText="Home" color="blue" />
          <LinkButton linkTo="/category" buttonText="Create New Category" color="blue" />
        </main>
      </div>
    </>
  );
};

export default CategoryList;
