import React, { useEffect, useState } from "react";
import "./App.css";
// import Homes from "./components/main/Home";
// import AllQuestions from "./components/home/AllQuestions";
import { StateProvider } from "./components/main/context";

function App() {
	let [username, setUserName] = useState("");
	const token = localStorage.getItem("token");
	console.log("this is the token", token);
	// let navigate = useNavigate();
	useEffect(() => {
		fetch("http://localhost:5500/api/users/check", {
			headers: {
				authorization: "Bearer " + token,
			},
		})
			.then((data) => data.json())
			.then((data) => {
				setUserName(data.username);
				if (
					data.msg === "token not provide" ||
					data.msg === "Authentication Invalid"
				)
					navigate("/");
			})
			.catch((error) => {
				// navigate("/");
			});
	}, []);

	return (
		<>
		<StateProvider/>
	
		</>
	);
}

export default App;
