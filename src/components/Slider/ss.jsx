import React from "react";
import ReactDOM from "react-dom";
import { Carousel } from "@trendyol-js/react-carousel";
import { Link } from "react-router-dom";
import style from "./Slider.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
export const Ss = () => {
  return (
    <div>
      <Link>
        <div>
          <img
            // divcomponent="img"
            // height="140"
            src="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
        </div>
        <div>
          <p>Lizard</p>
          <p>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </p>
        </div>
      </Link>
    </div>
  );
};
