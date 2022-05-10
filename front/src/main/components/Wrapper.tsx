import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
        <div className="container">
          <Link to={"/"} className="navbar-brand waves-effect">
            <strong className="blue-text">Home</strong>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>

            <ul className="navbar-nav nav-flex-icons">
              <li className="nav-item">
                <form
                  id="search_form"
                  method="GET"
                  action="{% url 'blog:post_search' %}"
                  className="form-inline d-flex justify-content-center md-form form-sm mt-0 mb-0"
                >
                  <input
                    type="text"
                    required
                    name="query"
                    className="form-control form-control-sm "
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <i
                    onClick={() => {
                      console.log("searh");
                    }}
                    className="fas fa-search"
                    aria-hidden="true"
                  ></i>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Body(props: PropsWithChildren<any>) {
  return <div className="col-md-8 mb-4">{props.children}</div>;
}

function Sidebar(props: PropsWithChildren<any>) {
  return <div className="col-md-4 mb-4">{props.children}</div>;
}

function Wrapper(props: PropsWithChildren<any>) {
  return (
    <>
      <Navbar />

      <main className="mt-5 pt-5">
        <div className="container">
          <section className="mt-4">
            <div className="row">{props.children}</div>
          </section>
        </div>
      </main>
    </>
  );
}

export { Wrapper, Body, Sidebar };
