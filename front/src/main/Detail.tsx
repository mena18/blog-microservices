import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Article, Comment } from "../interfaces/product";
import {
  Wrapper,
  Body as BodyWrapper,
  Sidebar as SidebarWrapper,
} from "../components/Wrapper";

const LikeRequest = async (token: string, article_id: number) => {
  try {
    const response = await fetch(
      `http://localhost:8002/api/article/${article_id}/like`,
      {
        method: "POST",
        headers: {
          Authorization: "bearer " + token,
        },
      }
    );
    return await response.json();
  } catch {
    return {};
  }
};

const DislikeRequest = async (token: string, article_id: number) => {
  try {
    const response = await fetch(
      `http://localhost:8002/api/article/${article_id}/like`,
      {
        method: "DELETE",
        headers: {
          Authorization: "bearer " + token,
        },
      }
    );
    return await response.json();
  } catch {
    return {};
  }
};

interface int {
  id: string;
}
interface IMyProps {
  article: Article;
}

interface articleCommentProps {
  article: Article;
  comments: any;
  setComments: any;
}

const ReplyComponent: React.FC<articleCommentProps> = (
  props: articleCommentProps
) => {
  const [commentBody, setCommentBody] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const params = useParams<int>();
  const article_id = params.id;
  const token = JSON.parse(localStorage.getItem("auth") || "{}").token;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    const response = await fetch(
      `http://localhost:8002/api/article/${article_id}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },

        body: JSON.stringify({
          body: commentBody,
        }),
      }
    );
    const res = await response.json();
    if (res.detail) {
      props.setComments([...props.comments, res.comment]);
      setCommentBody("");
      setLoader(false);
    }
  };

  return (
    <>
      <div className="card mb-3 wow fadeIn">
        <div className="card-header font-weight-bold">Leave a reply</div>
        <div className="card-body">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="replyFormComment">Your comment</label>
              <textarea
                name="body"
                className="form-control"
                id="replyFormComment"
                value={commentBody}
                onChange={(e) => {
                  setCommentBody(e.target.value);
                }}
              />
            </div>

            <div className="text-center mt-4">
              {loader ? (
                <button
                  className="btn btn-primary pmd-btn-raised pmd-btn-icon"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border pmd-spinner spinner-border-sm text-light mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <button
                  className="btn btn-primary pmd-btn-raised pmd-btn-icon"
                  type="submit"
                >
                  Post
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const CommentComponent: React.FC<articleCommentProps> = (
  props: articleCommentProps
) => {
  return (
    <div className="card card-comments mb-3 wow fadeIn">
      <div className="card-header font-weight-bold">
        {Math.max(props.article.num_comments, props.comments.length)} comment
      </div>

      <div className="card-body">
        {props.comments.map((comment: any) => {
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

interface cardProps {
  counter: number;
  like: boolean;
}

const Card: React.FC<IMyProps> = (props: IMyProps) => {
  const [isLiked, setIsLiked] = useState<cardProps>({} as cardProps);
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const params = useParams<int>();
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:8002/api/article/${params.id}/like`,
        {
          method: "GET",
          headers: {
            Authorization: "bearer " + auth.token,
          },
        }
      );

      const data = await response.json();
      setIsLiked({ like: data.liked, counter: 0 });
    })();
  }, []);

  const handleLike = async () => {
    if (isLiked.like) {
      setIsLiked({ like: false, counter: Math.min(0, isLiked.counter - 1) });
      const res = await DislikeRequest(auth.token, parseInt(params.id));
      if (!res.detail) {
        setIsLiked({ like: true, counter: isLiked.counter + 1 });
      }
    } else {
      setIsLiked({ like: true, counter: isLiked.counter + 1 });
      const res = await LikeRequest(auth.token, parseInt(params.id));
      if (!res.detail) {
        setIsLiked({ like: false, counter: Math.min(0, isLiked.counter - 1) });
      }
    }
  };
  return (
    <>
      <div key={params.id} className="card mb-4 wow fadeIn">
        <img src={props.article.image} className="img-fluid" alt="" />
      </div>

      <div key={params.id} className="card mb-4 wow fadeIn">
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
                className={`${
                  isLiked.like ? "fas" : "far"
                } fa-thumbs-up mr-1 fa-thumbs-up-hover `}
                // thums-up-liked
                aria-hidden="true"
              ></i>

              {props.article.likes + isLiked.counter}
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

const Sidebar: React.FC<any> = (props: any) => {
  return (
    <div className="card mb-4 wow fadeIn">
      <div className="card-header">Related articles</div>

      <div className="card-body">
        <ul className="list-unstyled">
          {props.articles.map((article: Article) => {
            const linkTarget = {
              pathname: `/articles/${article.id}`,
              key: article.id, // we could use Math.random, but that's not guaranteed unique.
            };

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
                    {/* <Link to={linkTarget} > */}
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
  const [article, setArticle] = useState<Article>({} as Article);
  const [similar_article, setSimilar_Article] = useState<Article[]>(
    [] as Article[]
  );
  const [comments, setComments] = useState<Comment[]>([] as Comment[]);
  const params = useParams<int>();
  const article_id = params.id;

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:8001/api/articles/${article_id}`
      );
      const data = await response.json();
      setArticle(data.article);
      setSimilar_Article(data.similar_articles);
    })();
  }, [article_id]);

  useEffect(() => {
    const get_comments = async () => {
      const response = await fetch(
        `http://localhost:8002/api/article/${article_id}/comment`
      );

      const data = await response.json();

      setComments(data.comments);
    };
    if (article_id) {
      get_comments();
    }
  }, [article_id]);

  return (
    <Wrapper key={article_id}>
      <BodyWrapper>
        <Card article={article} />
        <CommentComponent
          article={article}
          comments={comments}
          setComments={setComments}
        />
        <ReplyComponent
          article={article}
          comments={comments}
          setComments={setComments}
        />
      </BodyWrapper>

      <SidebarWrapper>
        <Sidebar articles={similar_article} />
      </SidebarWrapper>
    </Wrapper>
  );
}
