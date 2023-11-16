const dbConnection = require("../db/dbConfige");

const post_answer = async (req, res) => {
	const { answer } = req.body;
	const question_id = req.params.questionid;
	const userid = req.user.userid;
console.log(question_id)
	if (!answer) {
		return res.status(300).json({ msg: "provide answer field" });
	}
	try {
		await dbConnection.query(
			"INSERT INTO answers (questionid,userid, answer  ) value(?,?,?)",
			[question_id, userid, answer]
		);

		return res.status(200).json({ msg: "Answer posted successfully" });
	} catch (error) {
		console.log(error.message);
		return res
			.status(500)
			.json({ msg: "something went to wrong try again later" });
	}
};

//answer controller
const get_answer = async (req, res) => {
	const question_id = req.params.answerid;
console.log(question_id);
	try {
		let [allAnswer] = await dbConnection.query(
			`SELECT a.answer, u.username FROM answers a INNER JOIN users u ON a.userid = u.userid
WHERE a.questionid = ?`,
			[question_id]
		);
		return res.status(200).json({ allAnswer });
	} catch (error) {
		console.log(error.message);
		return res
			.status(500)
			.json({ msg: "something went to wrong try again later" });
	}
};

module.exports = { post_answer, get_answer };


// const DbConection = require("../db/dbConfige");
// const uuid=require("uuid");
// //post answer
// const post_answer = async (req, res) => {
//   const { answer } = req.body;
//   // const userid = req.params.questionid;
//   const { userid } = req.user;
//   // console.log(question_id);
//   if (!answer) {
//     return res.status(400).json({msg:'provide answer field'})
//   }
//   try {
//     const answer_id=uuid.v4();
    
//     await DbConection.query('INSERT INTO answer(questionid,userid, answer  ) value(?,?,?)',[ answer_id, userid, answer,])

//     return res.status(200).json({msg:'Answer posted successfully'})
//   } catch (error) {
//     console.log(error.message);
//     return res
//       .status(500)
//       .json({ msg: "something went to wrong try again later" });
//   }
// };
// const get_answer = async (req, res) => {
// 	const answer_id = req.params.answerid;
//   console.log(answer_id)

// 	try {
// 		let [allAnswer] = await dbConnection.query(
// 			`SELECT answers_.answer, users_.username FROM answers_ INNER JOIN users_ ON answers_.user_id = users_.userid
// WHERE answers_.question_id = ?`,
// 			[question_id]
// 		);
// 		return res.status(200).json({ allAnswer });
// 	} catch (error) {
// 		console.log(error.message);
// 		return res
// 			.status(500)
// 			.json({ msg: "something went to wrong try again later" });
// 	}
// };

// module.exports = { post_answer, get_answer };
