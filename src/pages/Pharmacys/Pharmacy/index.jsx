import React from "react";
import { ButtonMedicine } from "../../../components";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicine } from "../../../redux/slices/medicine";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "./Pharmacy.module.scss";
import moment from "moment/moment";

export const Pharmacy = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [view, setView] = React.useState("");
  const [text, setText] = React.useState("");
  const { medicine } = useSelector((state) => state.medicine);
  const isMedicineLoading = medicine.status === "loading";

  React.useEffect(() => {
    dispatch(fetchMedicine(id));
    // dispatch(fetchMedicationData());
  }, []);
  const colorMedicineDate = (date) => {
    const dateMedicine = moment(date);
    const dateMedicineFormat = new Date(dateMedicine);
    const dateNowDays = moment().add(30, "days");
    const dateNowDaysFormat = new Date(dateNowDays);
    const dateNowMonths = moment().add(3, "months");
    const dateNowMonthsFormat = new Date(dateNowMonths);
    // const dateNow = moment().add();
    // const dateNowFormat = new Date(dateNow);
    // if (dateMedicineFormat < dateNowFormat) {
    //   return "linear-gradient(to bottom, black, rgb(255, 255, 255))";
    // }
    if (dateMedicineFormat < dateNowDaysFormat) {
      return "https://i.ibb.co/7vt8mcF/Group-18.png";
    }
    if (dateMedicineFormat < dateNowMonthsFormat) {
      return "https://i.ibb.co/bBZmq6n/Group-19.png";
    }
    return "https://i.ibb.co/745pwRB/Group-17.png";
  };

  const dosageFormsMedicineDate = (date) => {
    if (date === "Таблетки") {
      return "https://i.ibb.co/Z6pqjWX/free-icon-pills-647301-1.png";
    }
    if (date === "Капсулы") {
      return "https://i.ibb.co/KXry3r0/free-icon-pills-822194-1.png";
    }
    if (date === "Мазь/гель/крем") {
      return "https://i.ibb.co/xqMYx1P/free-icon-ointment-2774016-1.png";
    }
    if (date === "Капли/спреи") {
      return "https://i.ibb.co/5nv9Fv2/free-icon-spray-4969162-1.png";
    }
  };

  const listItems = () => {
    if (text) {
      return medicine.items.filter((obj) => obj.title === text);
    }
    if (view) {
      return medicine.items.filter((obj) => obj.dosageForm === view);
    }
    return medicine.items;
  };
  const list = listItems();

  return (
    <>
      <div style={{ marginTop: "70px" }}>
        <div className={styles.topBar}>
          {/*<div className={styles.filter}>*/}
          <div
            style={{ height: "55px", width: "37%", backgroundColor: "#023047" }}
          >
            <p
              style={{
                padding: "15px 0 0 15px",
                margin: "0",
                fontSize: "20pt",
                color: "white",
              }}
            >
              Препараты
            </p>
          </div>
          <div style={{ width: "20%" }}>
            <TextField
              style={{
                width: "100%",
                // borderRadius: "5px",
                // border: "1px solid black",
              }}
              id="outlined-basic"
              label="Поиск"
              // variant="outlined"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className={styles.categories}>
            <FormControl
              style={{
                width: "100%",
                // borderRadius: "5px",
                // border: "1px solid black",
              }}
            >
              <InputLabel id="demo-simple-select-label">Категории</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={view}
                label="Вид"
                defaultValue=""
                onChange={(e) => setView(e.target.value)}
              >
                <MenuItem value={""}> </MenuItem>
                <MenuItem value={"Таблетки"}>Таблетки</MenuItem>
                <MenuItem value={"Капсулы"}>Капсулы</MenuItem>
                <MenuItem value={"Мазь/гель/крем"}>Мазь/гель/крем</MenuItem>
                <MenuItem value={"Капли/спреи"}>Капли/спреи</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/*</div>*/}
          <div
            style={{
              display: "flex",
              width: "21%",
              justifyContent: "flex-end",
            }}
          >
            <Link
              style={{ height: "55px", width: "100%" }}
              to={`/add-medicine/${id}`}
            >
              <Button
                style={{
                  fontSize: "12pt",
                  backgroundColor: "#FFB703",
                  height: "55px",
                  width: "100%",
                }}
                variant="contained"
              >
                Добавить препарат
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.medicine}>
          {(isMedicineLoading ? [...Array(5)] : list).map((obj, index) =>
            isMedicineLoading ? (
              <div />
            ) : (
              <ButtonMedicine
                ob={obj}
                title={obj.title}
                expiratioDate={obj.expiratioDate}
                dosageForms={dosageFormsMedicineDate(obj.dosageForm)}
                id={id}
                color={colorMedicineDate(obj.expiratioDate)}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};
