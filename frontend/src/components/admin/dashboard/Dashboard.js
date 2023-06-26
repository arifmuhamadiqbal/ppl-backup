import React, { useState, useEffect, useRef } from "react";
import "../css/admin.css";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faTachometerAlt,
  faBookmark,
  faBowlFood,
  faAngleRight,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { Chart, BarController, BarElement } from "chart.js";
import { LinearScale, CategoryScale } from "chart.js";

Chart.register(BarController, BarElement);
Chart.register(LinearScale, CategoryScale);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [menus, setMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [isSortActive, setIsSortActive] = useState(false);
  const [sortedOrders, setSortedOrders] = useState([]);
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    getMenus();
    getOrders();
  }, []);

  const getOrders = async () => {
    let response = await axios.get("http://localhost:5000/todayOrders");
    setOrders(response.data);
  };

  const getMenus = async () => {
    let response = await axios.get("http://localhost:5000/menus");
    setMenus(response.data);
  };

  const createChart = () => {
    const chartCanvas = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const totalData = orders.map((order) => order.total);
    const orderLabels = orders.map((_, index) => `Order ${index + 1}`);

    chartInstance.current = new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels: ["Total Revenue"],
        datasets: [
          {
            label: "Total Revenue",
            data: [totalData.reduce((a, b) => a + b, 0)],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || "";
                const value = context.parsed.y || 0;
                return label + ": Rp " + value.toFixed(2);
              },
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    createChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [orders]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = isSortActive
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
              <h1 className="mt-4 mb-4 text-primary">
                <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
              </h1>
              <div className="row">
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-primary text-white mb-4">
                    <div className="card-body">
                      Today Orders : {orders.length}
                    </div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <Link
                        className="small text-white stretched-link"
                        to={"/orders"}
                      >
                        View Details
                        <FontAwesomeIcon icon={faAngleRight} />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-success text-white mb-4">
                    <div className="card-body">
                      Total Menus : {menus.length}
                    </div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <Link
                        className="small text-white stretched-link"
                        to={"/menus"}
                      >
                        View Details
                        <FontAwesomeIcon icon={faAngleRight} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-header">
                  <FontAwesomeIcon icon={faTable} />: Today Orders
                </div>
                <div className="card-body">
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
                      {orders.map((n, index) => (
                        <React.Fragment key={index}>
                          {n.menus.map((menu, menuIndex) => (
                            <tr key={menuIndex}>
                              {menuIndex === 0 && (
                                <td rowSpan={n.menus.length}>{index + 1}</td>
                              )}
                              {menuIndex === 0 && (
                                <td rowSpan={n.menus.length}>{n.customer}</td>
                              )}
                              <td>{menu.name_menu}</td>
                              <td>{menu.ordermenus.quantity}</td>
                              {menuIndex === 0 && (
                                <td rowSpan={n.menus.length}>{n.date}</td>
                              )}
                              {menuIndex === 0 && (
                                <td rowSpan={n.menus.length}>Rp {n.total}</td>
                              )}
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <div className="card-footer">
                  <Pagination>
                    {isSortActive
                      ? Array(Math.ceil(sortedOrders.length / ordersPerPage))
                          .fill()
                          .map((_, i) => (
                            <Pagination.Item
                              key={i}
                              active={i + 1 === currentPage}
                              onClick={() => paginate(i + 1)}
                            >
                              {i + 1}
                            </Pagination.Item>
                          ))
                      : Array(Math.ceil(orders.length / ordersPerPage))
                          .fill()
                          .map((_, i) => (
                            <Pagination.Item
                              key={i}
                              active={i + 1 === currentPage}
                              onClick={() => paginate(i + 1)}
                            >
                              {i + 1}
                            </Pagination.Item>
                          ))}
                  </Pagination>
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-header">
                  <FontAwesomeIcon icon={faChartBar} />
                  Today Revenue
                </div>
                <div className="card-body">
                  <canvas ref={chartRef}></canvas>
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

export default Dashboard;
