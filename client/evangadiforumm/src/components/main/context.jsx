import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AskQuestion from '../home/AskQuestion';
import SingleQuestion from '../home/SingleQuestion';
import Home from './Home';
import NotFound from './NotFound';
import SharedPage from "./SharedPage";

// import Home from "../home/Home"
export const StateContext = createContext();

export const StateProvider = () => {
  const [username, setUserName] = useState(""); // Set initial state here
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5500/api/users/check", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "token not provide" || data.msg === "Authentication Invalid") {
            // Handle invalid authentication (e.g., redirect to login page)
            // You can also set an error state here if needed
          } else {
            setUserName(data.username);
          }
        })
        .catch((error) => {
          // Handle fetch error (e.g., set an error state)
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []); 

  return (
    <StateContext.Provider value={{ username, setUserName }}>
      <Routes>
					<Route path="/" element={<SharedPage />}>
						<Route path="/" element={<Home />} />
						{/* <Route path="/home" element={<Homes/>} /> */}
						<Route path="/question" element={<SingleQuestion />} />
						<Route path="/ask" element={<AskQuestion />} />
						<Route path="*" element={<NotFound />} />
						{/* <Route
							path="/singlequestion/:questionId"
							element={<SingleQuestion />}
						/> */}
						{/* <Route path="/askQuestion" element={<AskQuestion />} /> */}
					</Route>
				</Routes>
    </StateContext.Provider>
  );
};
