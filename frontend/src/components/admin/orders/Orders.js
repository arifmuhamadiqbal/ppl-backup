import React, { useState, useEffect } from "react";
import "../css/admin.css";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Pagination, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBookmark,
  faBowlFood,
  faTable,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(20);
  const [isSortActive, setIsSortActive] = useState(false);
  const [sortedOrders, setSortedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const sortByDate = () => {
    let sortedData;
    if (!isSortActive) {
      sortedData = [...orders].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    } else {
      sortedData = [...orders];
    }
    setSortedOrders(sortedData);
    setIsSortActive(!isSortActive);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    const filtered = orders.filter((order) =>
      order.customer.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = searchTerm
    ? filteredOrders
    : isSortActive
    ? sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder)
    : orders.slice(indexOfFirstOrder, indexOfLastOrder);

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
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4 mb-4 text-warning">
                <FontAwesomeIcon icon={faBookmark} /> Orders
              </h1>
              <div className="card mb-4">
                <div className="card-header">
                  <FontAwesomeIcon icon={faTable} /> All Orders
                  <button className="btn btn-primary ms-2" onClick={sortByDate}>
                    Sort by Date
                  </button>
                </div>
                <div className="card-body">
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <FormControl
                      type="text"
                      placeholder="Search by Customer name"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </InputGroup>
                  <Table striped bordered>
                    <thead className="text-center">
                      <tr>
                        <th>No.</th>
                        <th>Customer name</th>
                        <th colSpan="2">Menus</th>
                        <th>Date</th>
                        <th>Total</th>
                      </tr>
                      <tr>
                        <th></th>
                        <th></th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrders.map((order, index) => (
                        <React.Fragment key={order.id_order}>
                          {order.menus.map((menu, menuIndex) => (
                            <tr key={`${order.id_order}-${menuIndex}`}>
                              {menuIndex === 0 && (
                                <td rowSpan={order.menus.length}>
                                  {index + 1}
                                </td>
                              )}
                              {menuIndex === 0 && (
                                <td rowSpan={order.menus.length}>
                                  {order.customer}
                                </td>
                              )}
                              <td>{menu.name_menu}</td>
                              <td>{menu.ordermenus.quantity}</td>
                              {menuIndex === 0 && (
                                <>
                                  <td rowSpan={order.menus.length}>
                                    {order.date}
                                  </td>
                                  <td rowSpan={order.menus.length}>
                                    Rp {order.total}
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </Table>
                  <Pagination>
                    {Array.from({
                      length: Math.ceil(
                        searchTerm
                          ? filteredOrders.length / ordersPerPage
                          : isSortActive
                          ? sortedOrders.length / ordersPerPage
                          : orders.length / ordersPerPage
                      ),
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
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Orders;
