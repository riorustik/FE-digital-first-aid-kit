import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import styles from "./Post.module.scss";
// import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";
import { useDispatch } from "react-redux";

export const Post = ({
  _id,
  title,
  imageUrl,
  children,
  isFullPost,
  isLoading,
}) => {
  // const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }

  // const onClickRemove = () => {
  //   if (window.confirm("Удалить?")) {
  //     dispatch(fetchRemovePost(_id));
  //   }
  // };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {imageUrl && (
        <img className={clsx(styles.image)} src={imageUrl} alt={title} />
      )}
      <div className={styles.wrapper}>
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {title}
          </h2>
          {children && <div className={styles.content}>{children}</div>}
        </div>
      </div>
    </div>
  );
};
