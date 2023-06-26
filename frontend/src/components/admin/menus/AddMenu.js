import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../ui/Header";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";

const AddMenu = () => {
  const navigate = useNavigate();

  const { menuBaru } = useParams();
  const idBaru = parseInt(menuBaru) + 1;

  const [categories, setCategories] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuCategory, setMenuCategory] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const menuData = {
    //   menuName: menuName,
    //   menuDescription: menuDescription,
    //   menuPrice: menuPrice,
    //   menuCategory: menuCategory,
    //   fileName: fileName,
    //   file: file,
    // };

    const formData = new FormData();
    formData.append("menuName", menuName);
    formData.append("menuDescription", menuDescription);
    formData.append("menuPrice", menuPrice);
    formData.append("menuCategory", menuCategory);
    formData.append("fileName", fileName);
    formData.append("file", file);

    try {
      axios
        .post("http://localhost:5000/menus/addMenu", formData)
        .then(() => {
          return axios.post("http://localhost:5000/addMenuCategory", {
            FKid_menu: idBaru,
            FKid_category: menuCategory,
          });
        })
        .then(() => {
          navigate("/menus");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <Container style={{ marginTop: "32px" }}>
        <h2>Add Menu</h2>
        <Form className="form-control" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Input menu name"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
          />

          <label>Description</label>
          <input
            className="form-control"
            type="text"
            placeholder="Input menu description"
            value={menuDescription}
            onChange={(e) => setMenuDescription(e.target.value)}
          />

          <label>Price</label>
          <input
            className="form-control"
            type="number"
            placeholder="Input menu price"
            value={menuPrice}
            onChange={(e) => setMenuPrice(e.target.value)}
          />

          <label>Category</label>
          <div className="form-control">
            {categories.map((n) => (
              <div key={n.id_category}>
                <input
                  className="me-2"
                  type="radio"
                  name="menuCategory"
                  value={n.id_category}
                  onChange={(e) => setMenuCategory(e.target.value)}
                />
                <label>{n.name_category}</label>
              </div>
            ))}
          </div>

          <label>Image</label>
          <input
            className="form-control"
            type="file"
            name="file"
            onChange={(e) => {
              const foto = e.target.files[0];
              setPreview(URL.createObjectURL(foto));
              setFile(foto);
              setFileName(foto.name);
            }}
          />
          <br />
          {preview ? (
            <img
              className="mb-3"
              style={{ width: "300px", height: "150px" }}
              src={preview}
              alt="preview"
            />
          ) : (
            ""
          )}
          <br />

          <Link to={"/menus"}>
            <Button className="btn-secondary mt-4 me-2">Back</Button>
          </Link>
          <Button className="btn-primary mt-4" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddMenu;
