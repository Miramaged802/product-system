import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./components/pro.css";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  </Provider>
);
