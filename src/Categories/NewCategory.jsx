import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryService from "../services/category.service";
import { LinkButton, CustomButton } from '../Common/Buttons';

const NewCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (name.length === 0)
      return;
    const body = { 'category': { 'name': name } };

    CategoryService.createCategory(body).then((response) => {
      if (response.status === 201) {
        console.log(response.data)
        navigate(`/category/${response.data.id}`)
      }
    },
      error => {
        console.log(error)
      }
    )
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new category.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="recipeName">Category name</label>
              <input
                type="text"
                name="name"
                id="categoryName"
                className="form-control"
                required
                onChange={(event) => onChange(event, setName)}
              />
            </div>
            <CustomButton type="submit" buttonText="Create Category" color='green' />
            <LinkButton linkTo="/categories" buttonText="Back to categories" color='blue' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
