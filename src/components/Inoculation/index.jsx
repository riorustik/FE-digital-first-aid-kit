import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountry, fetchCountrys } from "../../redux/slices/country";
import axios from "../../axios";
import Button from "@mui/material/Button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
} from "@mui/material";
import style from "./Inoculation.module.scss";

export const Inoculation = () => {
  const dispatch = useDispatch();
  const { country } = useSelector((state) => state.country);
  const { countrys } = useSelector((state) => state.country);
  const [title, setTitle] = useState("");
  const isCountryLoading = countrys.status === "loading";
  const onSubmit = async () => {
    dispatch(fetchCountrys(title));
    if (!(title === "")) {
      toggleClass();
    }
  };
  React.useEffect(() => {
    dispatch(fetchCountry());
  }, []);
  // console.log(country.items);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [isActive, setActive] = useState(true);

  const toggleClass = () => {
    setActive(!isActive);
    setTitle("");
  };

  return (
    <div className={style.div_priv_one}
      // style={{ margin: "40px 0 0 10px", minWidth: "300px", minHeight: "400px" }}
    >
      <Paper className={style.div_priv_two}
        style={{
          // minWidth: "500px",
          // minHeight: "200px",
          // backgroundColor: "rgba(247,247,247,0.9)",
        }}
        elevation={3}
      >
        <div className={isActive ? null : style.non}>
          <h2 style={{ padding: "40px 0 0 20px" }}>Куда собираетесь?</h2>
          <FormControl
            style={{
              width: "250px",
              margin: "0 20px 0 20px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Страна</InputLabel>
            <Select
              style={{
                backgroundColor: "#fff",
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={title}
              MenuProps={MenuProps}
              label="Страна"
              onChange={(e) => setTitle(e.target.value)}
            >
              <MenuItem value={""}></MenuItem>
              {(isCountryLoading ? [...Array(1)] : country.items).map(
                (obj, index) =>
                  isCountryLoading ? (
                    <MenuItem value={""}></MenuItem>
                  ) : (
                    <MenuItem value={obj}>{obj}</MenuItem>
                  )
              )}
            </Select>
          </FormControl>
          <Button
            style={{ backgroundColor: "#FB8500", height: "55px" }}
            type="button"
            size="large"
            variant="contained"
            onClick={onSubmit}
          >
            Далее
          </Button>
        </div>
        <div className={isActive ? style.non : null}>
          <div className={style.divImage}>
            <span style={{ color: "#bebbbb", paddingTop: "5px" }}>
              Результат
            </span>
            <img
              onClick={toggleClass}
              src="https://i.ibb.co/SnSJ7wT/left-chevron.png"
              alt={"стрелка"}
            />
          </div>
          <div>
            {(isCountryLoading ? [...Array(1)] : countrys.items).map(
              (obj, index) =>
                isCountryLoading ? (
                  <div />
                ) : (
                  <div style={{ padding: "0 30px 30px 30px" }}>
                    {obj.country ? (
                      <h2>От каких заболеваний привиться перед поездкой</h2>
                    ) : (
                      ""
                    )}

                    {obj.yellowFever ? (
                      <>
                        <h3>💉 Желтая лихорадка</h3>
                        <p>{obj.yellowFever}</p>
                      </>
                    ) : (
                      ""
                    )}
                    {obj.hepatitisA ? (
                      <>
                        <h3>💉 Гепатит А</h3>
                        <p>{obj.hepatitisA}</p>
                      </>
                    ) : (
                      ""
                    )}
                    {obj.rabies ? (
                      <>
                        <h3>💉 Бешенство</h3>
                        <p>{obj.rabies}</p>
                      </>
                    ) : (
                      ""
                    )}
                    {obj.japaneseEncephalitis ? (
                      <>
                        <h3>💉 Японский энцефалит</h3>
                        <p>{obj.japaneseEncephalitis}</p>
                      </>
                    ) : (
                      ""
                    )}
                    {obj.cholera ? (
                      <>
                        <h3>💉 Холера</h3>
                        <p>{obj.cholera}</p>
                      </>
                    ) : (
                      ""
                    )}
                    {obj.typhoidFever ? (
                      <>
                        <h3>💉 Брюшной тиф</h3>
                        <p>{obj.typhoidFever}</p>
                      </>
                    ) : (
                      ""
                    )}
                    {obj.meningococcalInfection ? (
                      <>
                        <h3>💉 Менингококковая инфекция</h3>
                        <p>{obj.meningococcalInfection}</p>
                      </>
                    ) : (
                      ""
                    )}
                    {obj.diphtheria ? (
                      <>
                        <h3>💉 Дифтерия</h3>
                        <p>{obj.diphtheria}</p>
                      </>
                    ) : (
                      ""
                    )}
                    {obj.tetanus ? (
                      <>
                        <h3>💉 Cтолбнякя</h3>
                        <p>{obj.tetanus}</p>
                      </>
                    ) : (
                      ""
                    )}
                    {obj.polio ? (
                      <>
                        <h3>💉 Полиомиелит</h3>
                        <p>{obj.polio}</p>
                      </>
                    ) : (
                      ""
                    )}
                    {obj.malaria ? (
                      <>
                        <h3>💉 Маляри</h3>
                        <p>{obj.malaria}</p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};
