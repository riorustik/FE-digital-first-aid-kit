import React from "react";
import rr from "./ButtonMedicine.module.scss";
import { useDispatch } from "react-redux";
import { fetchRemoveMedicine } from "../../../redux/slices/medicine";
import moment from "moment";
import { Link } from "react-router-dom";

export const ButtonMedicine = ({
  id,
  title,
  expiratioDate,
  color,
  dosageForms,
  ob,
}) => {
  const dispatch = useDispatch();
  // const { medicine } = useSelector((state) => state.medicine);
  // const handleHeaderClick = () => {
  //
  //   // return <Navigate to="/" />;
  // };

  const handleButtonClick = (event) => {
    const url = `${id}/${title}`;
    dispatch(fetchRemoveMedicine(url));
    event.stopPropagation();
  };
  const ss = moment(ob.expiratioDate).format("MM-DD-YY");
  console.log(ss);
  const date = moment(expiratioDate).format("DD MM YYYY");
  return (
    <>
      <div className={rr.tools}>
        <Link
          to={`/receive/${title}`}
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
            <span>до: {date}</span>
          </div>
          <div>
            <img
              src={dosageForms}
              style={{ margin: "15px 15px 0 0", width: "80px", height: "80px" }}
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
          <Link to={`/add-medicine/${id}/${title}/${ss}`}>
            {/*  <Link to={{pathname: `/${this.props.testvalue}`, search: `?backUrl=${backUrl}`} />*/}
            <img src="https://i.ibb.co/5jryS8t/Group-14.png" alt={"+"} />
          </Link>

          {!(title === "Аптечка") ? (
            <img src={color} alt={"+"} />
          ) : <img src={color} alt={"+"} /> ? (
            title === "Аптечка"
          ) : (
            <img src={color} alt={"+"} />
          )}
        </div>
      </div>
    </>
  );
};
