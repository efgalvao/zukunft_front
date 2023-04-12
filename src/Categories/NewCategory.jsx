import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/user.service";

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

    userService.createCategory(body).then((response) => {
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

            <button type="submit" className="btn custom-button mt-3">
              Create Category
            </button>
            <Link to="/recipes" className="btn btn-link mt-3">
              Back to categories
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
