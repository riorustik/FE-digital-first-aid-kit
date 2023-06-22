import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import "easymde/dist/easymde.min.css";
import styles from "./AddCourse.module.scss";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../../../axios";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import moment from "moment/moment";

export const AddCourse = () => {
  const navigate = useNavigate();
  const { id, titleCourse, dateCal } = useParams();
  const isEditing = Boolean(titleCourse);
  let cal;
  if (dateCal === "nan" || dateCal === undefined) {
    cal = undefined;
  } else {
    cal = new Date(moment(dateCal).format("MM/DD/YY"));
  }

  const { register, handleSubmit } = useForm();
  const [isDosageForm, setIsDosageForm] = React.useState("");
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const [isMealTimeBefore, setIsMealTimeBefore] = useState(false);
  const [isMealTimeAfter, setIsMealTimeAfter] = useState(false);
  const [isMealTimeDuring, setIsMealTimeDuring] = useState(false);
  const [isMealTimeNoMatter, setIsMealTimeNoMatter] = useState(false);
  const [formatsDay, setFormatsDay] = React.useState(() => []);
  const [formatsDayR, setFormatsDayR] = React.useState("");
  const [isDay, setIsDay] = React.useState(true);
  const [isDate, setIsDate] = React.useState(true);
  const [isInput, setIsInput] = React.useState("");
  const [isTitle, setIsTitle] = React.useState("");
  const [isCount, setIsCount] = React.useState("");
  const [calendarDay, setCalendarDay] = React.useState(cal);
  const [countDayAll, setCountDayAll] = React.useState("");

  const mealTime = (val) => {
    if (val === "До еды") {
      setIsMealTimeBefore(true);
      setIsMealTimeAfter(false);
      setIsMealTimeDuring(false);
      setIsMealTimeNoMatter(false);
    }
    if (val === "После еды") {
      setIsMealTimeAfter(true);
      setIsMealTimeBefore(false);
      setIsMealTimeDuring(false);
      setIsMealTimeNoMatter(false);
    }
    if (val === "Во время еды") {
      setIsMealTimeDuring(true);
      setIsMealTimeBefore(false);
      setIsMealTimeAfter(false);
      setIsMealTimeNoMatter(false);
    }
    if (val === "неважно") {
      setIsMealTimeNoMatter(true);
      setIsMealTimeBefore(false);
      setIsMealTimeAfter(false);
      setIsMealTimeDuring(false);
    }
  };
  const onClickDate = () => {
    if (isDate) {
      return setIsDate(false);
    }
    return setIsDate(true);
  };
  const onClickDay = () => {
    if (isDay) {
      return setIsDay(false);
      setFormatsDay([]);
    }
    return setIsDay(true);
    setFormatsDayR("");
  };
  const handleFormat = (event, newFormats) => {
    setFormatsDay(newFormats);
  };
  const handleFormatR = (event, newFormats) => {
    setFormatsDayR(newFormats);
  };
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };
  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };
  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };
  const onSubmit = async () => {
    try {
      const v = {};
      console.log(formatsDayR);
      console.log(formatsDay);
      if (formatsDayR.length != 0 && formatsDay.length != 0) {
        return alert("Выберете один варинат периода приема");
      }
      if (formatsDayR.length > 1) {
        return alert("Выберете один варинат периода приема");
      }
      let format;
      if (formatsDayR.length != 0) {
        format = formatsDayR;
      }
      if (formatsDay.length != 0) {
        format = formatsDay;
      }
      let s = [];
      serviceList.map((obj) => {
        s.push(obj.service);
      });
      v.receptionDays = format;
      v.numberReceptions = s;
      // console.log(values);
      v.title = isTitle;
      v.singleDose = isCount;
      v.dosageForm = isDosageForm;
      v.regardingFood = isInput;
      if (calendarDay && countDayAll) {
        return alert("1234567890-");
      }
      if (calendarDay) {
        v.endOfReceptionDay = calendarDay;
      }

      if (countDayAll) {
        v.endOfReceptionNumber = countDayAll;
      }

      // const fields = {
      //   ,
      // };
      console.log(v);
      const url = `${id}/${titleCourse}`;
      console.log(url);
      isEditing ? await axios.post(`/add-course/${url}`, v) :await axios.patch(`/add-course/${id}`, v);
      // console.log(data);
      navigate(`/home`);
    } catch (err) {
      console.warn(err);
      alert(err);
    }
  };

  React.useEffect(() => {
    if (isEditing) {
      axios
        .get(`/test/${id}`)
        .then(({ data }) => {
          console.log(data);
          setIsTitle(data.title);
          setIsCount(data.singleDose);
          setIsDosageForm(data.dosageForm);
          // console.log(data.numberReceptions);
          let t = [];
          data.numberReceptions.map((obj) => {
            t.push(Object.assign({ service: `${obj}` }));
          });
          setServiceList([...t]);

          mealTime(data.regardingFood);
          setIsInput(data.regardingFood);
          if (data.receptionDays.length > 1) {
            setFormatsDay(data.receptionDays);
          } else {
            setFormatsDayR(data.receptionDays);
            onClickDay();
          }
          if (data.endOfReceptionNumber) {
            setCountDayAll(data.endOfReceptionNumber);
            onClickDate();
          }
        })
        .catch((err) => {
          console.warn(err);
          alert("what");
        });
    }
  }, []);
  console.log(formatsDayR);
  console.log(formatsDay);
  return (
    <form
      style={{
        width: "700px",
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
            {isEditing ? "Редактировать курс" : "Создание курса приема"}
          </p>
        </div>
        <div className={styles.buttons}>
          <Button
            style={{ backgroundColor: "#FB8500", height: "55px" }}
            type="button"
            onClick={onSubmit}
            size="large"
            variant="contained"
          >
            {isEditing ? "Сохранить" : "Добавить"}
          </Button>
          <Link to="/home">
            <Button size="large" style={{ height: "55px" }}>
              Отмена
            </Button>
          </Link>
        </div>
      </div>
      <div
        style={{
          // marginTop: "20px",
          padding: "50px 50px 50px 20px",
          width: "700px",
        }}
      >
        <TextField
          name="title"
          //{/*{...register("title", { required: "Укажите название" })}*/}
          style={{ marginBottom: "20px" }}
          variant="standard"
          placeholder="Укажите название препарата"
          // onChange={(e) => setTitle(e.target.value)}
          value={isTitle}
          onChange={(e) => setIsTitle(e.target.value)}
          fullWidth
        />
        <TextField
          name="singleDose"
          type={"number"}
          //  {/*{...register("singleDose")}*/}
          style={{ marginBottom: "20px" }}
          variant="standard"
          placeholder="Количество препарата"
          value={isCount}
          onChange={(e) => setIsCount(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth style={{ marginBottom: "10px" }}>
          <InputLabel id="demo-simple-select-label">Категория</InputLabel>
          <Select
            name="dosageForm"
            //{/*{...register("dosageForm", { required: "Укажите категорию" })}*/}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={isDosageForm}
            label="Категория"
            defaultValue=" "
            onChange={(e) => setIsDosageForm(e.target.value)}
          >
            <MenuItem value={" "}> </MenuItem>
            <MenuItem value={"Таблетки"}>Таблетки</MenuItem>
            <MenuItem value={"Капсулы"}>Капсулы</MenuItem>
            <MenuItem value={"Мазь/гель/крем"}>Мазь/гель/крем</MenuItem>
            <MenuItem value={"Капли/спреи"}>Капли/спреи</MenuItem>
          </Select>
        </FormControl>
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <label
            htmlFor="id1"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              // {...register("regardingFood")}
              name="regardingFood"
              style={{ visibility: "hidden" }}
              type="radio"
              // name="contact"
              id="id1"
              value={"До еды"}
              onChange={(e) => setIsInput(e.target.value)}
            />
            <img
              onClick={(e) => mealTime("До еды")}
              style={{ width: "50px", height: "auto" }}
              src="https://i.ibb.co/SKZPzhx/free-icon-apple-766921.png"
              alt=""
            />
            <span
              style={{
                borderBottom: isMealTimeBefore ? "3px solid #FFB703" : "",
              }}
            >
              До еды
            </span>
          </label>
          <label
            htmlFor="id2"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              //  {...register("regardingFood")}
              name="regardingFood"
              style={{ visibility: "hidden" }}
              type="radio"
              // name="contact"
              id="id2"
              value={"После еды"}
              onChange={(e) => setIsInput(e.target.value)}
            />
            <img
              onClick={(e) => mealTime("После еды")}
              style={{
                width: "50px",
                height: "auto",
              }}
              src="https://i.ibb.co/mXVhCpt/free-icon-apple-1012845.png"
              alt=""
            />
            <span
              style={{
                borderBottom: isMealTimeAfter ? "3px solid #FFB703" : "",
              }}
            >
              После еды
            </span>
          </label>
          <label
            htmlFor="id3"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              // {...register("regardingFood")}
              name="regardingFood"
              style={{ visibility: "hidden" }}
              type="radio"
              // name="contact"
              id="id3"
              value={"Во время еды"}
              onChange={(e) => setIsInput(e.target.value)}
              // onChange={sss}
            />
            <img
              onClick={(e) => mealTime("Во время еды")}
              style={{ width: "50px", height: "auto" }}
              src="https://i.ibb.co/sKy6RrF/free-icon-apple-812951.png"
              alt=""
            />
            <span
              style={{
                borderBottom: isMealTimeDuring ? "3px solid #FFB703" : "",
              }}
            >
              Во время еды
            </span>
          </label>
          <label
            htmlFor="id4"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              onChange={(e) => setIsInput(e.target.value)}
              //{...register("regardingFood")}
              name="regardingFood"
              style={{ visibility: "hidden" }}
              type="radio"
              // name="contact"
              id="id4"
              // onChange={sss}
              value={"неважно"}
            />
            <img
              onClick={(e) => mealTime("неважно")}
              style={{ width: "50px", height: "auto" }}
              src="https://i.ibb.co/vDzBS5M/free-icon-fruits-282462.png"
              alt=""
            />
            <span
              style={{
                borderBottom: isMealTimeNoMatter ? "3px solid #FFB703" : "",
              }}
            >
              неважно
            </span>
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          {serviceList.map((singleService, index) => (
            <>
              <span key={index} style={{ marginBottom: "5px" }}>
                <TextField
                  id="service"
                  type="time"
                  name="service"
                  value={singleService.service}
                  onChange={(e) => handleServiceChange(e, index)}
                  required
                />
                {serviceList.length !== 1 && (
                  <Button
                    style={{ margin: "5px", backgroundColor: "#FFB703" }}
                    // onClick={onClickDay}
                    variant="contained"
                    color="error"
                    type="button"
                    onClick={() => handleServiceRemove(index)}
                  >
                    Remove
                  </Button>
                )}
              </span>

              <div>
                {serviceList.length - 1 === index && serviceList.length < 4 && (
                  <Button
                    style={{
                      margin: "5px 0 5px 0",
                      backgroundColor: "#FFB703",
                    }}
                    // onClick={onClickDay}
                    variant="contained"
                    color="error"
                    type="button"
                    onClick={handleServiceAdd}
                  >
                    Добавить время
                  </Button>
                )}
              </div>
            </>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button
              style={{ height: "55px", backgroundColor: "#FFB703" }}
              onClick={onClickDay}
              variant="contained"
              color="error"
            >
              {!isDay ? "Выбрать дни" : "Выбрать период"}
            </Button>
          </div>

          {!isDay ? (
            <>
              <ToggleButtonGroup
                value={formatsDayR}
                onChange={handleFormatR}
                aria-label="text formatting"
              >
                <ToggleButton value="0 1 3 4 5 6 7" aria-label="italic">
                  <span>каждый день</span>
                </ToggleButton>
              </ToggleButtonGroup>
            </>
          ) : (
            <>
              <ToggleButtonGroup
                value={formatsDay}
                onChange={handleFormat}
                aria-label="text formatting"
              >
                <ToggleButton value="1" aria-label="bold">
                  <span>пн</span>
                </ToggleButton>
                <ToggleButton value="2" aria-label="italic">
                  <span>вт</span>
                </ToggleButton>
                <ToggleButton value="3" aria-label="italic">
                  <span>ср</span>
                </ToggleButton>
                <ToggleButton value="4" aria-label="italic">
                  <span>чт</span>
                </ToggleButton>
                <ToggleButton value="5" aria-label="italic">
                  <span>пт</span>
                </ToggleButton>
                <ToggleButton value="6" aria-label="italic">
                  <span>сб</span>
                </ToggleButton>
                <ToggleButton value="0" aria-label="italic">
                  <span>вс</span>
                </ToggleButton>
              </ToggleButtonGroup>
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div>
            <Button
              style={{ height: "55px", backgroundColor: "#FFB703" }}
              onClick={onClickDate}
              variant="contained"
              color="error"
            >
              {!isDate ? "Выбрать дату" : "Выбрать количество дней"}
            </Button>
          </div>

          {!isDate ? (
            <TextField
              name="endOfReceptionNumber"
              //{/*{...register("endOfReceptionNumber", {*/}
              // required: "Укажите количество ",
              // {/*})}*/}
              type={"number"}
              style={{ width: "250px" }}
              variant="standard"
              placeholder="Количество дней"
              value={countDayAll}
              onChange={(e) => setCountDayAll(e.target.value)}
              fullWidth
            />
          ) : (
            <div className="card flex">
              <Calendar
                name="endOfReceptionDay"
                // {...register("endOfReceptionDay", { required: "Укажите дату" })}
                value={calendarDay}
                onChange={(e) => setCalendarDay(e.target.value)}
                placeholder={"Дата"}
                fullWidth
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
