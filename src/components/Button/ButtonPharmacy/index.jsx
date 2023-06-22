import React from "react";
import style from "./ButtonPharmacy.module.scss";
import { Link } from "react-router-dom";
import { SpeedDial, SpeedDialIcon } from "@mui/material";

export const ButtonPharmacy = ({ _id, title }) => {
  return (
    <>
      <Link to={`${_id}`}>
        <div className={style.buttonPharmacy}>
          <div>
            <p>{title}</p>
          </div>

          {!(title === "Аптечка") ? (
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
            ""
          )}
        </div>
      </Link>
    </>
  );
};
