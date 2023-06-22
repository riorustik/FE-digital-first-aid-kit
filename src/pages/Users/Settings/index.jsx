import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "easymde/dist/easymde.min.css";
import styles from "./Settings.module.scss";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../../axios";

export const Settings = () => {
  const navigate = useNavigate();
  // const [isLoading, setLoading] = React.useState(false);
  const { data, status } = useSelector((state) => state.auth);
  const [isName, setIsName] = React.useState("");
  const [isAge, setIsAge] = React.useState("");
  const [isEmail, setIsEmail] = React.useState("");
  const [isNumber, setIsNumber] = React.useState("");
  const [isPassword, setIsPassword] = React.useState("");
  const [isPasswordNew, setIsPasswordNew] = React.useState("");
  const isLoading = status === "loading";
  const onSubmit = async () => {
    try {
      // setLoading(true);
      const fields = {
        id: data.userData?._id,
        isName,
        isEmail,
        isNumber,
        isAge,
      };
      await axios.post(`/settings-edit`, fields);
      // return <Navigate to="/" />;
      navigate(`/home`);
    } catch (err) {
      console.warn(err);
      alert("errrrrrrrr");
    }
  };

  React.useEffect(() => {
    if (!isLoading) {
      setIsName(data?.userData?.fullname);
      setIsEmail(data?.userData?.email);
      setIsAge(data?.userData?.age);
      setIsNumber(data?.userData?.phone);
    }
  }, []);

  const s = async () => {
    const fields = {
      id: data.userData?._id,
      isPassword,
      isPasswordNew,
    };
    const ss = await axios.post(`/settings-password`, fields).catch((err) => {
      console.warn(err);
      alert("what");
    });
    setIsPasswordNew("");
    setIsPassword("");
    if (ss) {
      alert("Пароль изменен!");
    }
  };

  return (
    <>
      <form
        // onSubmit={(onSubmit)}
        style={{
          width: "700px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "55px",
              width: "50%",
              backgroundColor: "#023047",
            }}
          >
            <p
              style={{
                padding: "15px 0 0 15px",
                margin: "0",
                fontSize: "18pt",
                color: "white",
              }}
            >
              Настройки
            </p>
          </div>
          <div className={styles.buttons}>
            <Button
              style={{ backgroundColor: "#FB8500", height: "55px" }}
              type="button"
              size="large"
              variant="contained"
              onClick={onSubmit}
            >
              Сохранить
            </Button>
            <Link to="/">
              <Button size="large" style={{ height: "55px" }}>
                Отмена
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.settingsDateAndTextField}>
          <div className={styles.allDateTextField}>
            <div className={styles.dateText}>Имя</div>
            <div className={styles.dateText}>Возраст</div>
            <div className={styles.dateText}>Номер тел.</div>
            <div className={styles.dateText}>Логин</div>
          </div>
          <div className={styles.allTextField}>
            <TextField
              // className={styles.textField}
              variant="standard"
              id={styles["sss"]}
              placeholder="Имя"
              value={isName}
              onChange={(e) => setIsName(e.target.value)}
              fullWidth
            />
            <TextField
              // className={styles.textField}
              type={"number"}
              id={styles["sss"]}
              variant="standard"
              placeholder="Возраст"
              value={isAge}
              onChange={(e) => setIsAge(e.target.value)}
              fullWidth
            />
            <TextField
              // className={styles.textField}
              variant="standard"
              id={styles["sss"]}
              placeholder="Номер"
              value={isNumber}
              onChange={(e) => setIsNumber(e.target.value)}
              fullWidth
            />
            <TextField
              // className={styles.textField}
              id={styles["sss"]}
              variant="standard"
              placeholder="Email"
              value={isEmail}
              onChange={(e) => setIsEmail(e.target.value)}
              fullWidth
            />
          </div>
        </div>
      </form>
      <div className={styles.dateText}></div>
      <div className={styles.passwordEdit}>
        <h3>Изменить пароль</h3>
        <div className={styles.settingsDateAndTextFieldPassword}>
          <div className={styles.allDateTextField}>
            <div className={styles.dateText}>Новый пароль</div>
            <div className={styles.dateText}>Старый пароль</div>
          </div>
          <div className={styles.allTextField}>
            <TextField
              // className={styles.textField}
              id={styles["sss"]}
              variant="standard"
              placeholder="Пароль"
              value={isPasswordNew}
              onChange={(e) => setIsPasswordNew(e.target.value)}
              fullWidth
            />
            <TextField
              // className={styles.textField}
              id={styles["sss"]}
              variant="standard"
              placeholder="Пароль"
              value={isPassword}
              onChange={(e) => setIsPassword(e.target.value)}
              fullWidth
            />
            <Button
              style={{
                backgroundColor: "#FB8500",
                height: "55px",
                marginTop: "10px",
              }}
              type="button"
              size="large"
              variant="contained"
              onClick={s}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
