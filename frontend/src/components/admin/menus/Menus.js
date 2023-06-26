import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/admin.css";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Table, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBookmark,
  faTable,
  faBowlFood,
} from "@fortawesome/free-solid-svg-icons";

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [menusPerPage] = useState(5);

  useEffect(() => {
    getMenus();
  }, []);

  const navigate = useNavigate();

  const getMenus = async () => {
    let response = await axios.get("http://localhost:5000/menus");
    setMenus(response.data);
  };

  const deleteMenuById = async (id_menu) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this menu?"
    );
    if (confirmed) {
      await axios.delete(`http://localhost:5000/menus/delete/${id_menu}`);
      console.log("Delete menu successful !");
      getMenus();
    }
  };

  const toAddMenu = () => {
    let menuBaru = menus.slice(-1).pop().id_menu;
    console.log("ini menu baru", menuBaru);
    navigate(`/menus/addMenu/${menuBaru}`);
  };

  const indexOfLastMenu = currentPage * menusPerPage;
  const indexOfFirstMenu = indexOfLastMenu - menusPerPage + 1;
  const currentMenus = menus.slice(indexOfFirstMenu - 1, indexOfLastMenu);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <div
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav py-2">
                <Link className="nav-link" to={"/admin"}>
                  <div className="sb-nav-link-icon">
                    <FontAwesomeIcon icon={faTachometerAlt} />
                  </div>
                  Dashboard
                </Link>
                <Link className="nav-link" to={"/orders"}>
                  <div className="sb-nav-link-icon">
                    <FontAwesomeIcon icon={faBookmark} />
                  </div>
                  Orders
                </Link>
                <Link className="nav-link" to={"/menus"}>
                  <div className="sb-nav-link-icon">
                    <FontAwesomeIcon icon={faBowlFood} />
                  </div>
                  Menus
                </Link>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              Admin
            </div>
          </div>
        </div>
        <div id="layoutSidenav_content">
          <div className="container-fluid px-4">
            <h1 className="mt-4 mb-4 text-info">
              <FontAwesomeIcon icon={faBowlFood} /> Menus
            </h1>
            <div className="card mb-4">
              <div className="card-header py-3">
                <FontAwesomeIcon icon={faTable} /> All Menu
                <button
                  onClick={toAddMenu}
                  className="btn btn-primary px-2 ms-3 text-white"
                >
                  Add Menu
                </button>
                <Link
                  to={"/menus/addCategory"}
                  className="btn btn-secondary px-2 ms-3 text-white"
                >
                  Add Category
                </Link>
              </div>
              <Table striped bordered className="table-sm">
                <thead>
                  <tr className="text-center">
                    <th>No.</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="small text-center">
                  {currentMenus.map((menu, index) => {
                    return (
                      <tr key={menu.id_menu}>
                        <td>{index + indexOfFirstMenu}</td>
                        <td>{menu.name_menu}</td>
                        <td>{menu.description}</td>
                        <td>
                          {menu.categories.map((category) => {
                            return (
                              <ul key={category.id_category}>
                                <li style={{ listStyleType: "none" }}>
                                  {category.name_category}
                                </li>
                              </ul>
                            );
                          })}
                        </td>
                        <td>Rp {menu.price}</td>
                        <td>
                          <img
                            className="rounded mt-4 mb-4"
                            style={{ width: "300px", height: "150px" }}
                            src={`http://localhost:5000/images/${menu.image}`}
                            alt="menu_photo"
                          />
                        </td>
                        <td>
                          <center className="mt-4">
                            <Link
                              className="btn btn-success px-2 ms-2 mb-2 mt-2"
                              to={`/menus/updateMenu/${menu.id_menu}`}
                            >
                              Update
                            </Link>
                            <button
                              className="btn btn-danger px-2 ms-2 mb-2 mt-2"
                              onClick={() => deleteMenuById(menu.id_menu)}
                            >
                              Delete
                            </button>
                          </center>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Pagination className="mx-4">
                {Array.from({
                  length: Math.ceil(menus.length / menusPerPage),
                }).map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Menus;
