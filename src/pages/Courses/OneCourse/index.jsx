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
import styles from "./OneCourse.module.scss";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../../../axios";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css";

import React, { useState } from "react";
import moment from "moment/moment";

export const OneCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [calendarDay, setCalendarDay] = React.useState("");
  const [countDayAll, setCountDayAll] = React.useState("");

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
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
    }
    return setIsDay(true);
  };

  React.useEffect(() => {
    // const id = "64766df65171d0768a66451d";
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
        setIsInput(data.regardingFood);
        setCalendarDay(moment(data.endOfReceptionDay).format("MM-DD-YY"));
        if (data.receptionDays.length > 1) {
          setFormatsDay(data.receptionDays);
        }
        if (data.receptionDays.length == 1) {
          setFormatsDayR(data.receptionDays);
          onClickDay();
        }
        if (data.endOfReceptionNumber) {
          setCountDayAll(data.endOfReceptionNumber);
          onClickDate();
        }
        // if (data.receptionDays.length > 1) {
        //   setFormatsDay(data.receptionDays);
        // }
        // if (data.receptionDays.length === 1) {
        //   setFormatsDayR(data.receptionDays);
        //   onClickDay();
        // }
        // if (data.endOfReceptionNumber) {
        //   setCountDayAll(data.endOfReceptionNumber);
        //   onClickDate();
        // }
      })
      .catch((err) => {
        console.warn(err);
        alert("what");
      });
  }, []);

  let d;
  if (calendarDay) {
    d = calendarDay;
  } else {
    d = "nan";
  }
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
            Курс приема
          </p>
        </div>
        <div className={styles.buttons}>
          <Link to={`/add-course/${id}/${isTitle}/${d}`}>
            <Button
              style={{ backgroundColor: "#FB8500", height: "55px" }}
              type="button"
              size="large"
              variant="contained"
            >
              Редактировать
            </Button>
          </Link>
          <Link to="/home">
            <Button size="large" style={{ height: "55px" }}>
              Назад
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
          label="Название препарата"
          value={isTitle}
          InputProps={{
            readOnly: true,
          }}
          type={"text"}
          variant="outlined"
          name="title"
          style={{ marginBottom: "20px" }}
          fullWidth
        />
        <TextField
          name="singleDose"
          type={"number"}
          style={{ marginBottom: "20px" }}
          value={isCount}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          label="Количество препарата"
          fullWidth
        />
        <TextField
          name="dosageForm"
          type={"text"}
          style={{ marginBottom: "20px" }}
          value={isDosageForm}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          label="Категория"
          fullWidth
        />
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {isInput === "До еды" ? (
            <label
              htmlFor="id1"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                name="regardingFood"
                style={{ visibility: "hidden" }}
                type="radio"
                id="id1"
                value={"До еды"}
              />
              <img
                style={{ width: "50px", height: "auto" }}
                src="https://i.ibb.co/SKZPzhx/free-icon-apple-766921.png"
                alt=""
              />
              <span
                style={{
                  borderBottom: "3px solid #FFB703",
                }}
              >
                До еды
              </span>
            </label>
          ) : isInput === "После еды" ? (
            <label
              htmlFor="id2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                name="regardingFood"
                style={{ visibility: "hidden" }}
                type="radio"
                id="id2"
                value={"После еды"}
              />
              <img
                style={{
                  width: "50px",
                  height: "auto",
                }}
                src="https://i.ibb.co/mXVhCpt/free-icon-apple-1012845.png"
                alt=""
              />
              <span
                style={{
                  borderBottom: "3px solid #FFB703",
                }}
              >
                После еды
              </span>
            </label>
          ) : isInput === "Во время еды" ? (
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
                name="regardingFood"
                style={{ visibility: "hidden" }}
                type="radio"
                id="id3"
                value={"Во время еды"}
              />
              <img
                style={{ width: "50px", height: "auto" }}
                src="https://i.ibb.co/sKy6RrF/free-icon-apple-812951.png"
                alt=""
              />
              <span
                style={{
                  borderBottom: "3px solid #FFB703",
                }}
              >
                Во время еды
              </span>
            </label>
          ) : (
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
                // onClick={(e) => mealTime("неважно")}
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
          )}

          <div style={{ marginTop: "20px" }}>
            {serviceList.map((singleService, index) => (
              <>
                <span key={index} style={{ marginRight: "5px" }}>
                  <TextField
                    id="service"
                    type="time"
                    name="service"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={singleService.service}
                    onChange={(e) => handleServiceChange(e, index)}
                    required
                  />
                </span>
              </>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {!isDate ? (
              <TextField
                name="endOfReceptionNumber"
                //{/*{...register("endOfReceptionNumber", {*/}
                // required: "Укажите количество ",
                // {/*})}*/}
                type={"number"}
                style={{ width: "250px" }}
                variant="outlined"
                label="Количество дней"
                value={countDayAll}
                fullWidth
              />
            ) : (
              <div className="card flex">
                <TextField
                  label="Дата"
                  variant="outlined"
                  type="text"
                  // defaultValue={calendarDay}
                  value={calendarDay}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                {/*<Calendar*/}
                {/*  name="endOfReceptionDay"*/}
                {/*  value={calendarDay}*/}
                {/*  placeholder={"Дата"}*/}
                {/*  fullWidth*/}
                {/*/>*/}
              </div>
            )}
          </div>

          {!isDay ? (
            <>
              <ToggleButtonGroup
                value={formatsDayR}
                // onChange={handleFormatR}
                aria-label="text formatting"
              >
                <ToggleButton value="через день" aria-label="italic">
                  <span>через день</span>
                </ToggleButton>
                <ToggleButton value="0 1 3 4 5 6 7" aria-label="italic">
                  <span>каждый день</span>
                </ToggleButton>
              </ToggleButtonGroup>
            </>
          ) : (
            <>
              <ToggleButtonGroup
                value={formatsDay}
                // onChange={handleFormat}
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
      </div>
    </form>
  );
};
