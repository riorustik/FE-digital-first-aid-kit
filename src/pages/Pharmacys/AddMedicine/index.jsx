import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css";
import { useSelector } from "react-redux";
import moment from "moment";

export const AddMedicine = () => {
  // const s = new Date(2021, 6, 1);

  const { id, titleMedicine, ss } = useParams();
  const s = moment(ss).format("MM/DD/YY");
  const navigate = useNavigate();
  const [isLoading, setLoading] = React.useState(false);
  const [expiratioDate, setexpiratioDate] = React.useState(new Date(s));
  const [title, setTitle] = React.useState("");
  const [dosageForm, setdosageForm] = React.useState("");
  // const { medicine, status } = useSelector((state) => state.medicine);
  const isEditing = Boolean(titleMedicine);
  // const isLoadingMed = status === "loading";
  console.log(s);
  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        title,
        dosageForm,
        expiratioDate,
      };
      // console.log(fields);
      //   console.log(expiratioDate);

      const url = `${id}/${titleMedicine}`;

      const { data } = isEditing
        ? await axios.post(`/add-medicine/${url}`, fields)
        : await axios.patch(`/add-medicine/${id}`, fields);

      const _id = isEditing ? id : data._id;

      navigate(`/home`);
    } catch (err) {
      console.warn(err);
      alert(err);
    }
  };

  // const [date, setDate] = useState(null);
  React.useEffect(() => {
    if (!isEditing) {
      // setTitle(data.title);
      // setexpiratioDate(data.expiratioDate);
      // setdosageForm(data.dosageForm);
    }
    const url = `${id}/${titleMedicine}`;
    if (titleMedicine) {
      axios
        .get(`/medicine-info/${url}`)
        .then(({ data }) => {
          // const date = moment("5/31/23").format("MM/DD/YY");

          setTitle(data.title);
          // setexpiratioDate(data.expiratioDate);
          setdosageForm(data.dosageForm);
        })
        .catch((err) => {
          // console.warn(err);
          // alert("what");
        });
    }
  }, []);

  // const options = React.useMemo(
  //   () => ({
  //     spellChecker: false,
  //     maxHeight: "400px",
  //     autofocus: true,
  //     placeholder: "Введите текст...",
  //     status: false,
  //     autosave: {
  //       enabled: true,
  //       delay: 1000,
  //     },
  //   }),
  //   []
  // );
  //
  // if (!window.localStorage.getItem("token") && !isAuth) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div style={{ marginTop: "30px", padding: "50px", width: "700px" }}>
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
              {isEditing ? "Редактирование препарата" : "Создание препарата"}
          </p>
        </div>
        <div className={styles.buttons}>
          <Button
            style={{ backgroundColor: "#FB8500", height: "55px" }}
            onClick={onSubmit}
            size="large"
            variant="contained"
          >
            {isEditing ? "Сохранить" : "Добавить"}
          </Button>
          <a href="/src/pages/Home">
            <Button size="large" style={{ height: "55px" }}>
              Отмена
            </Button>
          </a>
        </div>
      </div>

      <TextField
        style={{ margin: "30px 0 0 10px" }}
        variant="standard"
        placeholder="Название препарата..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />

      <FormControl fullWidth style={{ margin: "20px 0 0 10px" }}>
        <InputLabel id="demo-simple-select-label">Категория</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dosageForm}
          label="Вид"
          defaultValue=" "
          onChange={(e) => setdosageForm(e.target.value)}
        >
          <MenuItem value={" "}> </MenuItem>
          <MenuItem value={"Таблетки"}>Таблетки</MenuItem>
          <MenuItem value={"Капсулы"}>Капсулы</MenuItem>
          <MenuItem value={"Мазь/гель/крем"}>Мазь/гель/крем</MenuItem>
          <MenuItem value={"Капли/спреи"}>Капли/спреи</MenuItem>
        </Select>
      </FormControl>
      <div className="card flex" style={{ margin: "20px 0 0 10px" }}>
        <Calendar
          value={expiratioDate}
          // defaultValue={new Date()}
          onChange={(e) => setexpiratioDate(e.target.value)}
          placeholder={"Срок годности"}
          fullWidth
        />
      </div>
    </div>
  );
};
