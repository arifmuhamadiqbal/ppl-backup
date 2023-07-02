import React from "react";
import 'react-bootstrap';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Menus from "./components/admin/menus/Menus";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Orders from "./components/admin/orders/Orders";
import AddMenu from "./components/admin/menus/AddMenu";
import UpdateMenu from "./components/admin/menus/UpdateMenu";
import AddCategory from "./components/admin/menus/AddCategory";
import Main from "./components/client/main/Main"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          {/* admin */}
          <Route path="/admin" element = {<Dashboard />} />
          <Route path="/menus" element = {<Menus/>} />
          <Route path="/menus/addMenu/:menuBaru" element = {<AddMenu />} />
          <Route path="/menus/updateMenu/:id_menu" element = {<UpdateMenu />} />
          <Route path="/menus/addCategory" element = {<AddCategory />} />
          <Route path="/orders" element = {<Orders />} />

          {/*client*/}
          <Route path="/" element = {<Main />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
