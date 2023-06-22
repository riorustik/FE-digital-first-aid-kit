import React from "react";
// import {
//   Accordion,
//   AccordionSummary,
//   Typography,
//   AccordionDetails,
// } from "@mui/material";
export const MedicineData = ({ title, text }) => {
  return (
    <>
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            display: "flex",
            width: "30%",
            margin: "5px",
            fontWeight: "700",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", width: "80%", margin: "5px" }}>
          {text === "" ? "-" : text}
        </div>
        {/*<Accordion>*/}
        {/*  <AccordionSummary*/}
        {/*    expandIcon=""*/}
        {/*    aria-controls="panel1a-content"*/}
        {/*    // id="panel1a-header"*/}
        {/*  >*/}
        {/*    <Typography></Typography>*/}
        {/*  </AccordionSummary>*/}
        {/*  <AccordionDetails>*/}
        {/*    <Typography></Typography>*/}
        {/*  </AccordionDetails>*/}
        {/*</Accordion>*/}
      </div>
    </>
  );
};
