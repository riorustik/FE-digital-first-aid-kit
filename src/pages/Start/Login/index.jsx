import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Login.module.scss";
import { fetchLogin, selectorIsAuth } from "../../../redux/slices/auth";
import { Navigate, useNavigate } from "react-router-dom";
import {fetchAdminMedicine, fetchAdminStory, fetchAdminUser} from "../../../redux/slices/admin";

export const Login = () => {
  const isAuth = useSelector(selectorIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "rest@mail.ru",
      password: "2345678",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values));
    if (!data.payload) {
      return alert("не удалось авторизоваться!");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      window.localStorage.setItem("id", data.payload._id);
      window.localStorage.setItem("role", data.payload.role);
    }
  };
  const role = window.localStorage.getItem("role");
  console.log(role)
  if (isAuth) {
      return <Navigate to="/home" />;
    // navigate(`/home`);
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту!" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type={'password'}
          {...register("password", { required: "Укажите пароль!" })}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};
