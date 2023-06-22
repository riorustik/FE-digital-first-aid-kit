import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
export const ButtonMedsCards = ({ id, title }) => {
  return (
    <div style={{ margin: "10px" }}>
      <Card >
        <CardActionArea>
          <CardContent>
            <Typography style={{ width: "300px", height: "100px" }} gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
