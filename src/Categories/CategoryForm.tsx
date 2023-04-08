
import axios from "axios";
import { ICategory } from "../types/data"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const CategoryForm = (props: { updateCategoryList: (category: ICategory) => void; }) => {
  const [name, setName] = useState<string>('')

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async () => {
    const categoryData: ICategory = { name }

    try {
      const response = await axios
        .post('http://localhost:3000/api/v1/categories', { category: categoryData })

      props.updateCategoryList(response.data)

    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...register("title", { required: true })}
            type="text"
            name="title"
            onChange={e => setName(e.target.value)}
          />
          {errors?.title?.type === "required" && <p>This field is required</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button><hr />
      </Form>
    </>
  )
}
