import React, { useState } from "react";
import { ButtonCourse } from "../../../components";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../redux/slices/course";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Switch,
} from "@mui/material";
import styles from "./Course.module.scss";

export const Course = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [view, setView] = React.useState("");
  const [text, setText] = React.useState("");
  const { course } = useSelector((state) => state.course);
  const isMedicineLoading = course.status === "loading";
  React.useEffect(() => {
    dispatch(fetchCourses(id));
    // dispatch(fetchMedicationData());
  }, []);
  // console.log(course);

  const dosageFormsMedicineDateCourse = (date) => {
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
  // const [check, setCheck] = useState(true);
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

    const listItems = () => {
        if (text) {
            return course.items.filter((obj) => obj.title === text);
        }
        if (view) {
            return course.items.filter((obj) => obj.dosageForm === view);
        }
        return course.items;
    };
    const list = listItems();

  return (
    <>
      <div style={{ marginTop: "70px" }}>
        <div className={styles.topBar}>
          {/*<div className={styles.filter}>*/}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "55px",
              width: "37%",
              backgroundColor: "#023047",
            }}
          >
            <p
              style={{
                padding: "15px 0 0 15px",
                margin: "0",
                fontSize: "20pt",
                color: "white",
              }}
            >
              Курсы приема
            </p>
            <Switch
              checked={checked}
              onChange={handleChange}
              color="warning"
              inputProps={{ "aria-label": "controlled" }}
            />
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
              to={`/add-course/${id}`}
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
                Добавить курс
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.medicine}>
          {(isMedicineLoading ? [...Array(5)] : list).map(
            (obj, index) =>
              isMedicineLoading ? (
                <div />
              ) : (
                <>
                  {checked ? (
                    <>
                      {obj.isActive === true ? (
                        <ButtonCourse
                            activ={obj.isActive}
                          title={obj.title}
                          dosageForms={dosageFormsMedicineDateCourse(
                            obj.dosageForm
                          )}
                          id={obj._id}
                          allDay={obj.allDay}
                          dayThePast={obj.dayThePast}
                          startDay={obj.startDay}
                          endDay={obj.endDay}
                          obd={obj.endOfReceptionDay}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ) : !checked ? (
                    <>
                      {obj.isActive === false ? (
                        <ButtonCourse
                            activ={obj.isActive}
                          title={obj.title}
                          dosageForms={dosageFormsMedicineDateCourse(
                            obj.dosageForm
                          )}
                          id={obj._id}
                          allDay={obj.allDay}
                          dayThePast={obj.dayThePast}
                          startDay={obj.startDay}
                          endDay={obj.endDay}
                          obd={obj.endOfReceptionDay}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </>
              )
          )}
        </div>
      </div>
    </>
  );
};

//

// (
//     <>
//       {checked ? (
//           <>
//             {obj.isActive === true ? (
//                 <ButtonCourse
//                     title={obj.title}
//                     dosageForms={dosageFormsMedicineDateCourse(
//                         obj.dosageForm
//                     )}
//                     id={obj._id}
//                     allDay={obj.allDay}
//                     dayThePast={obj.dayThePast}
//                     startDay={obj.startDay}
//                     endDay={obj.endDay}
//                     obd={obj.endOfReceptionDay}
//                 />
//             ) : !checked ? (
//                 <>
//                   {obj.isActive === false ? (
//                       <ButtonCourse
//                           title={obj.title}
//                           dosageForms={dosageFormsMedicineDateCourse(
//                               obj.dosageForm
//                           )}
//                           id={obj._id}
//                           allDay={obj.allDay}
//                           dayThePast={obj.dayThePast}
//                           startDay={obj.startDay}
//                           endDay={obj.endDay}
//                           obd={obj.endOfReceptionDay}
//                       />
//                   ) : (
//                       ""
//                   )}
//                 </>
//             ) : (
//                 ""
//             )}
//           </>
//       ) : (
//           ""
//       )}
//     </>
// )
