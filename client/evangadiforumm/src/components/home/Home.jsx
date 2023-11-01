import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../../components/main/";
import PageviewRoundedIcon from "@mui/icons-material/PageviewRounded";

import { AppState } from 'appstate';
import { useNavigate } from "react-router-dom";
import QuestionDetail from "../home/QuestionDetail";
import "./Home.css";
import axiosBase from "./axiosConfig";

function Home() {
  const { userData } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [Filter, setFilter] = useState([]);
  const navigate = useNavigate();

  // console.log(Filter)
  // console.log(questions);
  // console.log(userData);
  const token = localStorage.getItem("token");
  const axios = axiosBase();
  const hadleclick = () => {
    navigate("/askquestion");
  };

  useEffect(() => {
    laosQuestions();
  }, [userData.username]);

  const laosQuestions = async () => {
    try {
      const data = await axios.get("/question/all_question", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setQuestions(data?.data?.allQuestion);
    } catch (error) {
      console.log(error.response);
    }
  };
  // laosQuestions()

  useEffect(() => {
    setFilter(
      questions.filter((q) =>
        q.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, questions]);
  return (
    <section className="container">
      <div className="tops col-12 col-md-8 md-4">
        <button className="blue_button" onClick={hadleclick}>
          AskQuestions
        </button>

        <div className="n_user">
          <h2 className="header_border">
            WellCome :<span className="user">{userData.username}</span>
          </h2>
        </div>
      </div>

      <div>
        <div className="search_bar">
          <input
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="search...."
          />
          <PageviewRoundedIcon className="search_icon" />
        </div>
      </div>

      <div>
        <div>
          {Filter.map((quest, i) => (
            <QuestionDetail question={quest} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
