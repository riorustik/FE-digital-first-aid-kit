# Цифровая аптечка | digital first aid kit (FRONTEND)

Проект, реализован в 2023 году на языке **`JavaScript`**

Проект написан с использованием фреймворка **`React`**, технологий **`Redux Toolkit` `Axios` `Material UI`** 

Клиентская часть проекта включает в себя хранилище данных, компоненты, страницы сайта.

Навигация сайта
```
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
```

Организация хранилища данных
```
  const store = configureStore({
    reducer: {
      medicine: medicineReducer,
      auth: authReducer,
      course: courseReducer,
      country: countryReducer,
      posts: postsReducer,
    },
  });
```
Запрос на сервер для получения препаратов в аптечке
```
  export const fetchMedicine = createAsyncThunk("posts/fetchTest", async (id) => {
    const { data } = await axios.get(`/add-medicine/${id}`);
    return data;
  });
```

Получение и сохранение данных с сервера
```
const medicineSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMedicine.pending]: (state) => {
      state.medicine.items = [];
      state.medicine.status = "loading";
    },
    [fetchMedicine.fulfilled]: (state, action) => {
      state.medicine.items = action.payload.medicines;
      state.medicine.status = "loaded";
    },
    [fetchMedicine.rejected]: (state) => {
      state.medicine.items = [];
      state.medicine.status = "error";
    },
  }
...
```

Использование "хуков" `useEffect` `useDispatch` для получения актуальной информации с сервера
```
  React.useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchPost());
  }, []);
```
Вытягивание данных из хранилища
```
  const { data, status, res } = useSelector((state) => state.auth);
```
Отображение препаратов пользователя
```
  <div className={styles.medicine}>
    {(isMedicineLoading ? [...Array(5)] : list).map((obj, index) =>
      isMedicineLoading ? (
        <div />
      ) : (
        <ButtonMedicine
          ob={obj}
          title={obj.title}
          expiratioDate={obj.expiratioDate}
          dosageForms={dosageFormsMedicineDate(obj.dosageForm)}
          id={id}
          color={colorMedicineDate(obj.expiratioDate)}
        />
      )
    )}
  </div>
```
<img src='https://i.ibb.co/BykKrv3/image.png' width=750>

React-компонент "карточка препарата"
```
export const ButtonMedicine = ({
  id,
  title,
  expiratioDate,
  color,
  dosageForms,
  ob,
}) => {
  const dispatch = useDispatch();
  const handleButtonClick = (event) => {
    const url = `${id}/${title}`;
    dispatch(fetchRemoveMedicine(url));
    event.stopPropagation();
  };
  const ss = moment(ob.expiratioDate).format("MM-DD-YY");
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
```
