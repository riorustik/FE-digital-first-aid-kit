import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
// import { Index } from "../components/AddComment";
// import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("ошибка при получении статьи!!!!!!!");
      });
  }, []);
  console.log(data);
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        _id={id}
        title={data.title}
        imageUrl={
          data.imageUrl
            // ? `http://localhost:4444${data.imageUrl}`
            // : "https://pharmmedprom.ru/wp-content/uploads/2023/05/alexander-grey-tr1po6kowec-unsplash-scaled-e1684247064816.jpg"
        }
        isFullPost
        isLoading={isLoading}
      >
        <ReactMarkdown children={data.text} />
      </Post>
    </>
  );
};
