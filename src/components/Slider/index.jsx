import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Slider.module.scss";
export const Slider = ({ id, imageURL, title }) => {
  return (
    <div className={style.kingDiv}>
      <Link to={`/${id}`}>
        <div className={style.card}>
          <div className={style.imageBlock}>
            <img className={style.image} src={imageURL} alt="icon" />
          </div>
          <div className={style.text}>
            <p>{title}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
