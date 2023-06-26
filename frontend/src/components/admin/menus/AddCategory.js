import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";
import Header from "../ui/Header";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteCategory = async (id_category) => {
    try {
      await axios.delete(
        `http://localhost:5000/menus/addCategory/delete/${id_category}`
      );
      console.log("Delete successful");
      getCategories();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <Container style={{ marginTop: "32px" }}>
        <h2 className="py-2">Add Category</h2>
        <Form
          className="form-control"
          onSubmit={async (e) => {
            console.log(newCategory);
            try {
              e.preventDefault();
              await axios.post("http://localhost:5000/menus/addCategory", {
                newCategory: newCategory,
              });
              getCategories();
            } catch (error) {
              console.log(error.message);
            }
          }}
        >
          <label>List category</label>
          <div className="form-control py-4">
            {categories.map((n) => (
              <div key={n.id_category}>
                <ul>
                  <li style={{ listStyleType: "none" }}>
                    <Button
                      className="btn-danger me-2"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteCategory(n.id_category);
                      }}
                    >
                      Delete
                    </Button>
                    {n.name_category}
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <label>Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Input category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Link to={"/menus"}>
            <Button className="btn-secondary mt-4 mb-4">Back</Button>
          </Link>
          <Button className="btn-primary mx-2 mt-4 mb-4" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddCategory;
