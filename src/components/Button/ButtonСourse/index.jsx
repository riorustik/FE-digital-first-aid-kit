import React from "react";
import rr from "./ButtonCourse.module.scss";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRemoveCourse } from "../../../redux/slices/course";

export const ButtonCourse = ({
  id,
  title,
  dosageForms,
  allDay,
  dayThePast,
  startDay,
  endDay,
  obd, activ
}) => {
  const dispatch = useDispatch();

  const handleButtonClick = (event) => {
    // const url = `${id}/${title}`;
    dispatch(fetchRemoveCourse(id));
    event.stopPropagation();
  };
  let s;
  // if (!(dayThePast === allDay)) {
  //   s = (dayThePast * 100) / allDay;
  // } else {
  //   s = 250;
  // }
  //
  if (dayThePast <= allDay) {
    s = (dayThePast * 100) / allDay;
    s = `${s}%`;
  } else if (dayThePast > allDay) {
    s = `${250}px`;
  } else {
    s = `${250}px`;
  }
  let d;
  if (obd) {
    d = obd;
  } else {
    d = "nan";
  }
  // console.log(s);
  const dayIsProgress = `${dayThePast}/${allDay} дней`;
  const dayIsProgressf = `${allDay}/${allDay} дней`;
  return (
    <>
      <div className={rr.tools}>
        <Link
          to={`/reveal-course/${id}`}
          style={{
            backgroundColor: "#219EBC",
            borderRadius: "5px",
            textDecoration: "none",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "85%",
          }}
        >
          <div>
            <p className={rr.titleName}>{title}</p>
            <span>
              {startDay} - {endDay}
            </span>
            <div
              style={{
                margin: "10px 0 15px 15px",
                width: "250px",
                height: "45px",
                backgroundColor: "#fff",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  // margin: "0 0 5px 5px",
                  width: "100%",
                  height: "100%",
                  background: "#FB8500",
                  boxShadow: "2px 2px 3px #A27402",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    // margin: "0 0 5px 5px",
                    width: s,
                    height: "100%",
                    background: "#FFB703",
                    boxShadow: "2px 2px 3px #A27402",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "center",
                    zIndex: "1",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      width: "200px",
                      paddingTop: "12px",
                      zIndex: "999",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      bottom: "0",
                    }}
                  >
                      {activ ? dayIsProgress : dayIsProgressf}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src={dosageForms}
              style={{ margin: "15px 15px 0 0", width: "80px", height: "80px" }}
              alt={"+"}
            />
          </div>
        </Link>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "15%",
          }}
        >
          <img
            style={{ marginBottom: "5px" }}
            src="https://i.ibb.co/fdwW0mk/Group-16.png"
            onClick={handleButtonClick}
            alt={"+"}
          />
          <Link to={`/add-course/${id}/${title}/${d}`}>
            <img src="https://i.ibb.co/5jryS8t/Group-14.png" alt={"+"} />
          </Link>

          {/*{!(title === "Аптечка") ? (*/}
          {/*  <img src={color} alt={"+"} />*/}
          {/*) : <img src={color} alt={"+"} /> ? (*/}
          {/*  title === "Аптечка"*/}
          {/*) : (*/}
          {/*  <img src={color} alt={"+"} />*/}
          {/*)}*/}
        </div>
      </div>
    </>
  );
};
