import React from "react";
import style from "./ButtonHomeCourse.module.scss";
import { Link } from "react-router-dom";

export const ButtonHomeCourse = ({
  id,
  title,
  allDay,
  dayThePast,
  startDay,
  endDay,
}) => {
  let s;

  if (dayThePast <= allDay) {
    s = (dayThePast * 100) / allDay;
    s = `${s}%`;
  } else if (dayThePast > allDay) {
    s = `${200}px`;
  } else {
    s = `${200}px`;
  }

  // console.log(s);
  const dayIsProgress = `${dayThePast}/${allDay} дней`;

  return (
    <>
      <Link to={`${id}`}>
        <div className={style.buttonPharmacy}>
          <div className={style.buttonPharmacyDiv}>
            <p>{title}</p>
            {title === "Добавить курс" ? (
              <img
                style={{
                  width: "40px",
                  height: "auto",
                  position: "absolute",
                  bottom: -16,
                  right: -16,
                }}
                src="https://i.ibb.co/RTkP8VY/Group-4.png"
                alt={"+"}
              />
            ) : (
              <>
                <p>
                  {startDay} - {endDay}
                </p>
                <div
                  style={{
                    margin: "20px 0 0 0",
                    width: "200px",
                    height: "30px",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
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
                      <span className={style.dateTab}>{dayIsProgress}</span>
                    </div>
                  </div>
                </div>

                {/*<div className={style.dateTab}> 5/30 таблеток</div>*/}
              </>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};
