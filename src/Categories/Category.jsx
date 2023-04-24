import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryService from "../services/category.service";
import { LinkButton } from '../Common/Buttons';

const Category = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState('');

  useEffect(() => {
    CategoryService.getCategory(params.id).then((response) => {
      if (response.status === 200) {
        setCategory(response.data)
        return response.data;
      }
    }, error => {
      console.log("Network response was not ok.")
      navigate("/categories");
    });
  }, [params.id]);

  const deleteCategory = () => {
    CategoryService.deleteCategory(params.id).then((response) => {
      if (response.status === 200) {
        navigate("/categories")
      }
    },
      error => {
        console.log("Network response was not ok.")
      }
    )
  };

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img
          src='https://picsum.photos/500/400'
          alt={category.name}
          className="img-fluid position-absolute"
        />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-black">
          {category.name}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteCategory}
            >
              Delete Category
            </button>
          </div>
        </div>
        <LinkButton linkTo="/categories" buttonText="Back to Categories" color='blue' />
      </div>
    </div>
  );
};

export default Category;
