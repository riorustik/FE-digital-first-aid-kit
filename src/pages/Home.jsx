import React from "react";
import { Button, Avatar } from "@mui/material";
import { ButtonPharmacy, ButtonHomeCourse, Inoculation } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuthMe } from "../redux/slices/auth";
import styles from "./home.module.scss";
import { Link } from "react-router-dom";
import { fetchLastCourses } from "../redux/slices/course";
import { Slider } from "../components/Slider";
import { Post } from "../components/Post";
import { fetchPost } from "../redux/slices/post";
import style from "../components/Slider/Slider.module.scss";

export const Home = () => {
  const dispatch = useDispatch();
  const { data, status, res } = useSelector((state) => state.auth);
  // const { lastCourses } = useSelector((state) => state.course);
  // console.log(data);
  // const isMedicineLoading = lastCourses.status === "loading";
  const isLoading = status === "loading";
  const { posts } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";
  React.useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchPost());
    // if (!isLoading) {
    //   dispatch(fetchLastCourses(data?.userData?._id));
    // }
  }, []);

  const listItems = () => {
    if (res) {
      return res.filter((obj) => obj.isActive === true);
    }
    return res;
  };
  const list = listItems();

  let s;
  if (!isLoading) {
    if (list.length <= 2) {
      s = "flex-start";
    } else {
      s = "space-between";
    }
  } else {
    s = "space-between";
  }
console.log(list)
    console.log(res)

  return (
    <>
      <div className={styles.fullBlock}>
        <div className={styles.userBlock}>
          <div className={styles.userInfo}>
            <div className={styles.userInfoImg}>
              {/*<Avatar sx={{ width: "180px", height: "180px" }}>*/}
              {/*  <h1>s</h1>*/}
              {/*</Avatar>*/}
                <img src={'https://i.ibb.co/tCxc8x1/150-1504268-antu-im-user-online-user-500-x-500.png'} style={{ width: "180px", height: "180px" }}/>
            </div>
            <div className={styles.userText}>
              <p>
                <span>Имя </span>
                <span>{data?.userData?.fullname}</span>
              </p>
              <p>
                <span>Возраст: </span>
                <span>{data?.userData?.age}</span>
                {/*<span>{data?.userData?.age}</span>*/}
              </p>
              <Link to="/settings-edit">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#FFB703" }}
                >
                  Настройки
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles.userButton}>
            <ButtonPharmacy
              title={"Аптечка"}
              _id={`/pharmacy/${data?.userData?.pharmacy}`}
            />
            <ButtonPharmacy
              title={"Добавить препарат"}
              _id={`/add-medicine/${data?.userData?.pharmacy}`}
            ></ButtonPharmacy>
          </div>
        </div>

        {/*курсы приема*/}
        <div className={styles.course}
        >
          <div className={styles.course_div_one}
          >
            <div className={styles.course_div_two}
            >
              <p
              >
                Курсы приема
              </p>
            </div>
            <div className={styles.course_div_free}
            >
              <Link
                style={{ height: "55px", width: "100%" }}
                to={`/courses/${data?.userData?._id}`}
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
                  Все курсы
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles.course_div_four}
            style={{
                justifyContent: s,
            }}
          >
            <ButtonHomeCourse
              title={"Добавить курс"}
              id={`/add-course/${data?.userData?._id}`}
            />
            {/*<div className={styles.medicine}>*/}
            {(isLoading ? [...Array(3)] : list).map((obj, index, array) =>
              isLoading ? (
                <div />
              ) : (
                <ButtonHomeCourse
                  title={obj.title}
                  allDay={obj.allDay}
                  dayThePast={obj.dayThePast}
                  startDay={obj.startDay}
                  endDay={obj.endDay}
                  id={`/reveal-course/${obj._id}`}
                />
              )
            )}
            {/*</div>*/}
          </div>
        </div>

        {/*//статьи*/}
        <div className={styles.posts}
          style={{

          }}
        >
          <div className={styles.posts_div}
            style={{
            }}
          >
            <div
              style={{
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
                О здоровье
              </p>
            </div>
            <div
              style={{
                display: "flex",
                width: "21%",
                justifyContent: "flex-end",
              }}
            ></div>
          </div>
          <div className={styles.posts_div_one}

          >
            {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
              isPostsLoading ? (
                <div></div>
              ) : (
                <Slider
                  id={`posts/${obj._id}`}
                  imageURL={
                    obj.imageUrl
                      // ? `http://localhost:4444${obj.imageUrl}`
                      // : "https://pharmmedprom.ru/wp-content/uploads/2023/05/alexander-grey-tr1po6kowec-unsplash-scaled-e1684247064816.jpg"
                  }
                  title={obj.title}
                />
              )
            )}
          </div>
        </div>

        {/*прививки*/}
        <div className={styles.inoculation}
        >
          <div className={styles.inoculation_one}
          >
            <div className={styles.inoculation_two}
            >
              <p className={styles.inoculation_freeo}
              >
                Туристические прививки
              </p>
            </div>
            <div
              style={{
                display: "flex",
                width: "21%",
                justifyContent: "flex-end",
              }}
            ></div>
          </div>
          <div>
            <Inoculation />
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
};
