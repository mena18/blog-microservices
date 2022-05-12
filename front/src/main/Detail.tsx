import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Article, Comment } from "../interfaces/product";
import {
  Wrapper,
  Body as BodyWrapper,
  Sidebar as SidebarWrapper,
} from "../components/Wrapper";

interface int {
  id: string;
}
interface IMyProps {
  article: Article;
}

const ReplyComponent: React.FC<IMyProps> = (props: IMyProps) => {
  return (
    <>
      <div className="card mb-3 wow fadeIn">
        <div className="card-header font-weight-bold">Leave a reply</div>
        <div className="card-body">
          <form method="POST">
            <div className="form-group">
              <label htmlFor="replyFormComment">Your comment</label>
              <textarea
                name="body"
                className="form-control"
                id="replyFormComment"
              ></textarea>
            </div>

            <label htmlFor="replyFormName">Your name</label>
            <input
              name="name"
              type="text"
              id="replyFormName"
              className="form-control"
            />

            <br />

            <label htmlFor="replyFormEmail">Your e-mail</label>
            <input
              name="email"
              type="email"
              id="replyFormEmail"
              className="form-control"
            />

            <div className="text-center mt-4">
              <button className="btn btn-info btn-md" type="submit">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const CommentComponent: React.FC<IMyProps> = (props: IMyProps) => {
  const [comments, setComments] = useState<Comment[]>([] as Comment[]);

  useEffect(() => {
    const get_comments = async () => {
      const response = await fetch(
        `http://localhost:8002/api/article/${props.article.id}/comment`
      );

      const data = await response.json();

      setComments(data.comments);
    };
    if (props.article.id) {
      get_comments();
    }
  }, [props.article.id]);

  return (
    <div className="card card-comments mb-3 wow fadeIn">
      <div className="card-header font-weight-bold">
        {props.article.num_comments} comment
      </div>

      <div className="card-body">
        {comments.map((comment) => {
          return (
            <div className="media d-block d-md-flex mt-4">
              <img
                className="d-flex mb-3 mx-auto "
                style={{ width: 60 }}
                src={`${process.env.PUBLIC_URL}/images/user.jpg`}
                alt="Generic placeholder image"
              />
              <div className="media-body text-center text-md-left ml-md-3 ml-0">
                <h5 className="mt-0 font-weight-bold">{comment.email}</h5>
                <p>{comment.date}</p>
                {comment.body}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Card: React.FC<IMyProps> = (props: IMyProps) => {
  const handleLike = () => {
    alert("liked");
  };
  return (
    <>
      <div className="card mb-4 wow fadeIn">
        <img src={props.article.image} className="img-fluid" alt="" />
      </div>

      <div className="card mb-4 wow fadeIn">
        <div className="card-body">
          <div style={{ position: "relative" }}>
            <h1>{props.article.title}</h1>
            <p
              className="float-right"
              style={{
                position: "absolute",
                right: "0px",
                top: "10px",
                fontSize: "24px",
              }}
            >
              <i
                onClick={handleLike}
                className="fas fa-thumbs-up mr-1 fa-thumbs-up-hover "
                // thums-up-liked
                aria-hidden="true"
              ></i>
              {props.article.likes}
            </p>
          </div>

          {props.article.body}

          {/* <p class="tags">
      Tags:
      {% for tag in post.tags.all %}

        <a href="{% url 'blog:post_list_by_tag' tag.slug %}" style="font-size:17px;" class="badge badge-pill badge-primary ml-2">{{ tag.name }}</a>
          
      {% endfor %}
    </p> */}
          <hr className="mt-5" />
          <p className="date">Published on {props.article.date}</p>
        </div>
      </div>
    </>
  );
};

const Sidebar: React.FC<IMyProps> = (props: IMyProps) => {
  const [similarPosts, setsimilarPosts] = useState<Article[]>([] as Article[]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8001/api/articles`);
      const data: Article[] = await response.json();
      setsimilarPosts(data);
    })();
  }, []);

  return (
    <div className="card mb-4 wow fadeIn">
      <div className="card-header">Related articles</div>

      <div className="card-body">
        <ul className="list-unstyled">
          {similarPosts.map((article) => {
            return (
              <li className="media my-4">
                <img
                  className="small-image d-flex mr-3"
                  style={{ width: 70 }}
                  src={article.image}
                  alt="Generic placeholder image"
                />
                <div className="media-body">
                  <Link to={`/articles/${article.id}`}>
                    <h5 className="mt-0 mb-1 font-weight-bold">
                      {article.title}
                    </h5>
                  </Link>

                  {article.body.slice(0, 10)}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default function Detail() {
  const { id } = useParams<int>();
  const [article, setArticle] = useState<Article>({} as Article);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8001/api/articles/${id}`);
      const data: Article = await response.json();
      setArticle(data);
    })();
  }, []);

  return (
    <Wrapper>
      <BodyWrapper>
        <Card article={article} />
        <CommentComponent article={article} />
        <ReplyComponent article={article} />
      </BodyWrapper>

      <SidebarWrapper>
        <Sidebar article={article} />
      </SidebarWrapper>
    </Wrapper>
  );
}
