import React from "react";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectorIsAuth } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);
  const navigate = useNavigate();
  const onClickLogout = () => {
    if (window.confirm("Выйти?")) {
      dispatch(logout());
      navigate(`/login`);
      window.localStorage.removeItem("token");
    }
  };

  // if (!isAuth) {
  //   //вроде работает
  //   return <Navigate to="/login" />;
  // }

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          {isAuth ? (
            <Link className={styles.logo} to="/home">
              <div>ДОМАШНЯЯ АПТЕЧКА</div>
            </Link>
          ) : (
            <Link className={styles.logo} to="/">
              <div>ДОМАШНЯЯ АПТЕЧКА</div>
            </Link>
          )}
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Button
                  style={{ backgroundColor: "#FB8500" }}
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="contained">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
