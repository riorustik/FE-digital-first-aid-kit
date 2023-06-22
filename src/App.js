import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import {
  Home,
  Registration,
  AddMedicine,
  Login,
  Pharmacy,
  Medicine,
  AddCourse,
  Course,
  Settings,
  OneCourse,
  Start,
} from "./pages";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";
import React from "react";
import { FullPost } from "./pages/FullPost";;
import styles from "./pages/home.module.scss";
function App() {
  const dispatch = useDispatch();
  // const isAuth = useSelector(selectorIsAuth);
  React.useEffect(() => {
    dispatch(fetchAuthMe());
    // console.log(t);
  }, []);

  return (
    <>
      <Header />
      <Container className={styles.www}>
        <Routes>
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/" element={<Start />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-medicine/:id" element={<AddMedicine />} />
          <Route
            path="/add-medicine/:id/:titleMedicine/:ss"
            element={<AddMedicine />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/add-course/:id" element={<AddCourse />} />
          <Route
            path="/add-course/:id/:titleCourse/:dateCal"
            element={<AddCourse />}
          />
          <Route path="/courses/:id" element={<Course />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/pharmacy/:id" element={<Pharmacy />} />
          <Route path="/receive/:title" element={<Medicine />} />
          <Route path="/settings-edit" element={<Settings />} />
          <Route path="/reveal-course/:id" element={<OneCourse />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
