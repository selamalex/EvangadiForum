const express = require("express");
const router = express.Router();

const { post_answer, get_answer } = require("../controller/answerController");

router.post("/postanswer/:questions_id", post_answer);
router.get("/answers/:answerid", get_answer);

module.exports = router;