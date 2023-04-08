import { useState, useEffect } from "react"
import { Category } from "./Category"
import { CategoryForm } from './CategoryForm'
import { ICategory } from "../types/data"
import axios from 'axios';

export const CategoryList = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [isUpdate, setUpdate] = useState<boolean>(false)

  useEffect(() => {
    getCategories()
    setUpdate(false)
  }, [isUpdate])

  const getCategories = async () => {
    try {
      const response = await axios
        .get('http://localhost:3000/api/v1/categories')

      const data = response.data

      setCategories(data.reverse())

    } catch (error: any) {
      console.log(error)
    }
  }

  const updateCategoryList = (category: ICategory) => {
    let _categories = categories;
    _categories.unshift(category);
    setCategories(_categories);

    setUpdate(true)
  }

  return (
    <>
      <CategoryForm updateCategoryList={updateCategoryList} />

      <h1>Categorias</h1>
      {categories.map((category: ICategory) => (
        <Category
          key={category.id}
          name={category.name}
        />
      ))}
    </>
  )
}
