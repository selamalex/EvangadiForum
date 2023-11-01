const dbConnection = require("../db/dbConfige");
const uuid=require("uuid");

// post question controller
async function postQuestions(req, res) {
  const { title, description, tag } = req.body;

  if (!title || !description || !tag) {
    return res.status(400).json({ msg: "Please provide all information" });
  }

  try {
    const userid = req.user.userid;
    const questionid = uuid.v4();
    // console.log(questionid);

    await dbConnection.query(
      "INSERT INTO questions (questionid, title, description, tag, userid) VALUES (?, ?, ?, ?, ?)",
      [questionid, title, description, tag, userid]
    );
    return res
      .status(201)
      .json({ msg: "Question posted successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ msg: "Something wents wrong, please try again later" });
  }
}

// all question controller
async function allQuestions(req, res) {
	try {
		const [allQuestion] = await dbConnection.query(
			`SELECT q.questionid, q.title, u.username FROM questions q JOIN users u ON q.userid = u.userid  ORDER BY id DESC;`
		);
		// console.log(allQuestion);
		return res.status(200).json({ allQuestion });
	} catch (error) {
		// Log and return a 500 internal server error response if an error occurs
		console.log(error.message);
		res.status(500).json({ msg: "Something went wrong, please try again" });
	}
}

// single question controller
async function singleQuestion(req, res) {
	const questionId = req.params.questionid;

	//check if the question id is provided by the user
	if (!req.params.questionid) {
		return res.status(400).json({ msg: "single question id not provided" });
	}

	try {
		//query to the database to select the question
		const [oneQuestion] = await dbConnection.query(
			"SELECT * FROM questions WHERE questionid = ?",
			[questionId]
		);

		//check if the provided question id is not in the database
		if (oneQuestion.length == 0) {
			return res
				.status(400)
				.json({ msg: "question not found with the provided id" });
		} else {
			//if the provided question id is exist on the database return the data
			res.send({ oneQuestion });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Something went wrong, please try again" });
	}
}


module.exports = { postQuestions, allQuestions, singleQuestion };
