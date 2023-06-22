import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import {Link} from "react-router-dom";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { selectorIsAuth } from "../../../redux/slices/auth";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "../../../axios";

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectorIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  // const [tags, setTags] = React.useState("");
  // const [imageUrl, setImageUrl] = React.useState("");
  // const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  // const handleChangeFile = async (event) => {
  //   try {
  //     const formData = new FormData();
  //     const file = event.target.files[0];
  //     formData.append("image", file);
  //     const { data } = await axios.post("/upload", formData);
  //     setImageUrl(data.url);
  //   } catch (err) {
  //     console.warn(err);
  //     alert("errrrrrrrr");
  //   }
  // };

  // const onClickRemoveImage = () => {
  //   setImageUrl("");
  // };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);
  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        title,
        // imageUrl,
        // tags,
        text,
      };
      // const { data } = isEditing
        // ? await axios.patch(`/posts/${id}`, fields)
        // :
        await axios.post("/posts", fields);

      // const _id = isEditing ? id : data._id;

      navigate(`/`);
    } catch (err) {
      console.warn(err);
      alert("errrrrrrrr");
    }
  };

  // React.useEffect(() => {
  //   if (id) {
  //     axios
  //       .get(`/posts/${id}`)
  //       .then(({ data }) => {
  //         setTitle(data.title);
  //         setText(data.text);
  //         setTags(data.tags.join(","));
  //         setImageUrl(data.imageUrl);
  //       })
  //       .catch((err) => {
  //         console.warn(err);
  //         alert("what");
  //       });
  //   }
  // }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  // console.log(title, tags, value);

  return (
    <>
        <Link to={'/admin/posts'} style={{ marginBottom: "30px" }}>
            <Button
                variant="outlined"
                size="large"
            >
                Назад
            </Button>
        </Link>
        <Paper style={{ padding: "5px 30px 30px 30px" }}>

            {/*<input*/}
            {/*  ref={inputFileRef}*/}
            {/*  type="file"*/}
            {/*  onChange={handleChangeFile}*/}
            {/*  hidden*/}
            {/*/>*/}
            {/*{imageUrl && (*/}
            {/*  <>*/}
            {/*    <Button*/}
            {/*      variant="contained"*/}
            {/*      color="error"*/}
            {/*      onClick={onClickRemoveImage}*/}
            {/*    >*/}
            {/*      Удалить*/}
            {/*    </Button>*/}
            {/*    <img*/}
            {/*      className={styles.image}*/}
            {/*      src={`http://localhost:4444${imageUrl}`}*/}
            {/*      alt="Uploaded"*/}
            {/*    />*/}
            {/*  </>*/}
            {/*)}*/}
            {/*<br />*/}
            {/*<br />*/}
            <TextField
                classes={{ root: styles.title }}
                variant="standard"
                placeholder="Заголовок статьи..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
            />
            <SimpleMDE
                className={styles.editor}
                value={text}
                onChange={onChange}
                options={options}
            />
            <div className={styles.buttons}>
                <Button onClick={onSubmit} size="large" variant="contained">
                    Сохранить
                </Button>
                <a href="/">
                    <Button size="large">Отмена</Button>
                </a>
            </div>
        </Paper>
    </>
  );
};
