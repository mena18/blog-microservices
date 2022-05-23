import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Article } from "../interfaces/product";
import {
  Wrapper,
  Body as BodyWrapper,
  Sidebar as SidebarWrapper,
} from "../components/Wrapper";

const article_view = (article: Article) => {
  return (
    <div>
      <div className="card mb-4 wow fadeIn">
        <div className="card mb-4 wow fadeIn">
          <img src={article.image} className="img-fluid" alt="" />
        </div>

        <h1 className="text-center">
          <Link to={`/articles/${article.id}`}>{article.title}</Link>
        </h1>

        <div className="card-body">
          {article.body}
          {/* <div className="pt-5 tags">
            <a
              href="{% url 'blog:post_list_by_tag' tag.slug %}"
              style={{ fontSize: "17px;" }}
              className="badge badge-pill badge-primary ml-2"
            >
              Name
            </a>
          </div> */}

          <div className="text-center pt-3">
            <Link
              to={`/articles/${article.id}`}
              style={{ fontSize: "24px;", padding: "10px 20px" }}
              className="badge badge-pill badge-dark ml-2"
            >
              Read More
            </Link>
          </div>

          <div className="pt-3">
            <hr />
            <p>
              Published on {article.date}{" "}
              <span className="float-right">
                <i className="fas fa-comment pr-1" aria-hidden="true"></i>
                {article.num_comments}
              </span>
              <span className="float-right mr-4">
                <i className="fas fa-thumbs-up" aria-hidden="true"></i>{" "}
                {article.likes}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Main = () => {
  const [articles, setArticles] = useState([] as Article[]);
  const [likedArticles, setLikedArticles] = useState<Article[]>(
    [] as Article[]
  );

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8001/api/articles");
      const data: Article[] = await response.json();
      setArticles([...data]);
    })();

    (async () => {
      const response = await fetch(
        "http://localhost:8001/api/articles/most_liked"
      );
      const data: Article[] = await response.json();
      setLikedArticles([...data]);
    })();
  }, []);

  // const change_page = (id: number) => {
  //   console.log(id);
  // };
  const like = async (id: number) => {
    console.log("liked");
    // await fetch(`http://localhost:8001/api/products/${id}/like`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    // });

    // setProducts(
    //   products.map((p: Product) => {
    //     if (p.id === id) {
    //       p.likes++;
    //     }

    //     return p;
    //   })
    // );
  };

  const articles_view = articles.map((p) => {
    return article_view(p);
  });

  return (
    <Wrapper>
      <BodyWrapper>{articles_view}</BodyWrapper>
      <SidebarWrapper>
        <div className="card mb-4 wow fadeIn">
          <div className="card-header">Most Liked Articles</div>

          <div className="card-body">
            <ul className="list-unstyled">
              {likedArticles.map((article) => {
                return (
                  <li className="media my-4" key={article.id}>
                    <img
                      className="small-image d-flex mr-3"
                      style={{ width: "75px", height: "75px" }}
                      src={article.image}
                      alt="Generic placeholder image"
                    />
                    <div className="media-body">
                      <Link to={`/articles/${article.id}`}>
                        <h5 className="mt-0 mb-1 font-weight-bold">
                          {article.title}
                        </h5>
                      </Link>
                      {article.body.slice(0, 15)}...
                    </div>
                    <p>
                      <i className="fas fa-thumbs-up" aria-hidden="true"></i>{" "}
                      {article.likes}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </SidebarWrapper>
    </Wrapper>
  );
};

export default Main;
