import React from "react";
import "./App.css";
import Products from "./admin/Products";
import { BrowserRouter, Route } from "react-router-dom";
import ProductsCreate from "./admin/ProductsCreate";
import ProductsEdit from "./admin/ProductsEdit";

// user
import Main from "./main/Main";
import Detail from "./main/Detail";

// Auth
import signup from "./auth/signup";
import Login from "./auth/login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/signup" exact component={signup} />
        <Route path="/login" exact component={Login} />

        <Route path="/" exact component={Main} />
        <Route path="/articles" exact component={Main} />
        <Route path="/articles/:id" exact component={Detail} />
        <Route path="/admin/products" exact component={Products} />
        <Route path="/admin/products/create" exact component={ProductsCreate} />
        <Route path="/admin/products/:id/edit" exact component={ProductsEdit} />
      </BrowserRouter>
    </div>
  );
}

export default App;
