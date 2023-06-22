import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Slider } from "../../../components/Slider";
import {fetchPostAdmin} from "../../../redux/slices/post";
import styles from "../../home.module.scss";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {fetchRemovePostAd} from "../../../redux/slices/post";


export const Article = () => {
    const dispatch = useDispatch();
    const { postsAdmin } = useSelector((state) => state.posts);

    const isPostsLoading = postsAdmin.status === "loading";
    React.useEffect(() => {
        dispatch(fetchPostAdmin());
    }, []);
    const onClickRemove = (e) => {
        console.log(e)
        if (window.confirm("Удалить?")) {
            console.log("!!!!")
            dispatch(fetchRemovePostAd(e));
        }
    };
    return (
        <div className={styles.course}
        >
            <div className={styles.course_div_one}
            >
                <div className={styles.course_div_two}
                >
                    <p
                    >
                        Статьи
                    </p>
                </div>
                <div className={styles.course_div_free}
                >
                    <Link
                        style={{ height: "55px", width: "100%" }}
                        to={`/admin/add-posts`}
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
                            Добавить
                        </Button>
                    </Link>
                </div>
                <div className={styles.course_div_free}
                >
                    <Link
                        style={{ height: "55px", width: "100%" }}
                        to={`/admin`}
                    >
                        <Button
                            style={{
                                fontSize: "12pt",
                                backgroundColor: "rgba(255,183,3,0)",
                                height: "55px",
                                width: "100%",
                            }}
                            variant="outlined"
                            size="large"
                            // variant="contained"
                        >
                            Назад
                        </Button>
                    </Link>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    width: "1200px",
                    // flexWrap: "wrap",
                    justifyContent: "space-between",
                    flexDirection: 'column'
                }}
            >
                {(isPostsLoading ? [...Array(5)] : postsAdmin.items).map((obj, index) =>
                    isPostsLoading ? (
                        <div></div>
                    ) : (
                        <div style={{marginTop: '20px', display: "flex",  justifyContent:"flex-start", alignItems: 'center'}}>
                            {/*{((obj._id) ? setData(obj._id) : setData())}*/}
                            <Link style={{width: '500px'}} to={`/posts/${obj._id}`}>{obj.title}</Link>
                            <Button style={{backgroundColor: 'red'}} variant="contained" onClick={(e) => onClickRemove(obj._id)} >
                                Удалить
                            </Button>
                        </div>
                        // <Slider
                        //     id={`posts/${obj._id}`}
                        //     imageURL={
                        //         obj.imageUrl
                        //         // ? `http://localhost:4444${obj.imageUrl}`
                        //         // : "https://pharmmedprom.ru/wp-content/uploads/2023/05/alexander-grey-tr1po6kowec-unsplash-scaled-e1684247064816.jpg"
                        //     }
                        //     title={obj.title}
                        // />
                    )
                )}
            </div>
        </div>

    );
};
