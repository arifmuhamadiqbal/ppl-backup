import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../ui/Header";

const UpdateMenu = () => {
  const { id_menu } = useParams();

  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);

  const [newCategory, setNewCategory] = useState("");

  const [data, setData] = useState({
    first: true,
    newName: "",
    newDescription: "",
    newPrice: "",
    newImage: "",
  });

  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  if (data.first === true && menu.length !== 0) {
    setData({
      first: false,
      newName: menu.name_menu,
      newDescription: menu.description,
      newPrice: menu.price,
      newImage: menu.image,
    });
  }

  useEffect(() => {
    getMenuById();
    getCategories();
  }, []);

  const getMenuById = async () => {
    let response = await axios.get(
      `http://localhost:5000/menus/update/${id_menu}`
    );
    setMenu(response.data);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async () => {
    if (
      data.newName === menu.name_menu &&
      data.newDescription === menu.description &&
      data.newPrice === menu.price &&
      newCategory === ""
    ) {
      navigate("/menus");
      return;
    }

    const menuData = {
      newName: data.newName,
      newDescription: data.newDescription,
      newPrice: data.newPrice,
      newCategory: newCategory,
      newImage: data.newImage,
      file: file,
    };

    try {
      axios.put(`http://localhost:5000/menus/update/${id_menu}`, menuData);
    } catch (error) {
      console.log(error.message);
    }
    navigate("/menus");
  };

  return (
    <>
      <Header />
      <Container style={{ marginTop: "32px" }}>
        <h2>Update Menu</h2>
        <Form
          className="form-control"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Input menu name"
            value={data.newName}
            onChange={(e) => {
              setData({
                first: false,
                newName: e.target.value,
                newDescription: data.newDescription,
                newPrice: data.newPrice,
                newImage: data.newImage,
              });
            }}
          />

          <label>Description</label>
          <input
            className="form-control"
            type="text"
            placeholder="Input menu description"
            value={data.newDescription}
            onChange={(e) => {
              setData({
                first: false,
                newName: data.newName,
                newDescription: e.target.value,
                newPrice: data.newPrice,
                newImage: data.newImage,
              });
            }}
          />

          <label>Price</label>
          <input
            className="form-control"
            type="number"
            placeholder="Input menu price"
            value={data.newPrice}
            onChange={(e) => {
              setData({
                first: false,
                newName: data.newName,
                newDescription: data.newDescription,
                newPrice: e.target.value,
                newImage: data.newImage,
              });
            }}
          />

          <label>Category</label>
          <div className="form-control">
            {categories.map((f) => {
              const isChecked = f.id_category === newCategory;
              return (
                <ul key={f} className="mt-2">
                  <input
                    type="radio"
                    value={f.id_category}
                    onChange={() => setNewCategory(f.id_category)}
                    checked={isChecked}
                  />
                  <label className="px-2">{f.name_category}</label>
                </ul>
              );
            })}
          </div>

          <label>Image</label>
          <input
            className="form-control"
            type={"file"}
            name="file"
            onChange={(e) => {
              const foto = e.target.files[0];
              setPreview(URL.createObjectURL(foto));
              setFile(foto);
              setData({
                first: false,
                newName: data.newName,
                newDescription: data.newDescription,
                newPrice: data.newPrice,
                newImage: foto.name,
              });
            }}
          />
          <label>New image :</label>
          <br />
          {preview ? (
            <img
              className="mb-3"
              style={{ width: "200px", height: "100px" }}
              src={preview}
              alt="preview"
            />
          ) : (
            ""
          )}
          <br />
          <label>Recent image :</label>
          <img
            className="form-control"
            style={{ width: "200px", height: "100px" }}
            src={"http://localhost:5000/images/" + menu.image}
            alt="recent"
          />

          <Link to={"/menus"}>
            <Button className="btn-secondary mt-4">Back</Button>
          </Link>
          <Button className="btn-primary mt-4 mx-2" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UpdateMenu;
