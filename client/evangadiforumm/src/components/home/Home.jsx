import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../../components/main/";

import { useNavigate } from "react-router-dom";
// import { StateContext } from "../main/context";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { state } from "../main/stateValue";
import "./Home.css";
import axios from "./axiosConfig";
function Home() {
  const { username, setUserName } = useContext(state);
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [Filter, setFilter] = useState([]);
  const navigate = useNavigate();
console.log(username);
  // console.log(Filter)
  // console.log(questions);
  // console.log(userData);
  const token = localStorage.getItem("token");
  
  const handleclick = () => {
    navigate("/ask");
  };

  useEffect(() => {
    laosQuestions();
  }, []
  // "USER"
  );

  const laosQuestions = async () => {
    try {
      const data = await axios.get("/questions/all-questions", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
.then((response)=>{
  console.log("all question resopnse",response.data.allQuestion)
   setQuestions(response?.data?.allQuestion);
})
     
      // console.log(data);
      .catch((error)=>{
        console.log(error)
      })
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
  function click(q){
    console.log("id",q.questionid)
    navigate("/answer/"+q.questionid)
  }
  return (
    <>
    <div className="thewholepart">
    <div className="upperpart">
    <div className="tops col-12 col-md-8 md-4">
        <button className="blue_button" onClick={handleclick}>
          AskQuestions
        </button>
</div>
<div className="search_bar">
          <input
          className="search"
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search Questions "
          />
         
        </div>

        <div className="n_user">
          <h2 className="header_border">
            Welcome 
          </h2>
        </div>
     
</div>
        <div className="marginedpart"> 
      <h1 className="questionshead">Questions</h1>
     
      {Filter.length > 0 ? (
        Filter.map((singleQuestion, index) => (
         
             
          <div
            className="questions"
            onClick={() => click(singleQuestion)}
            key={index}
          >
            
            <div className="imagepart">
            <hr/>
            <CgProfile className='profile' />
            <p className="usernamef">{singleQuestion?.username}</p>
            </div>
            <div className="width">
             
             
              <h4 className="titlename">{singleQuestion?.title}</h4>
            </div>
            <div>
            <IoIosArrowForward className="arrowright" size="40px"/>
              </div>
           
          </div>
        ))
      ) : (
        <p>No matching questions found.</p>
      )}
      </div>

     </div>
    
    </>
   
  );
}

export default Home;
