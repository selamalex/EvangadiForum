const express= require("express");
const app=express();
const port = 5500;
const authMiddleware = require("./middleware/authMiddleware");
//db connction

const dbConnection=require("../server/db/dbConfige");

//user routes middleware file
const userRoutes=require("../server/routess/userRoute");

//json middleware to extract json data
app.use(express.json())

//user routes middleware
 app.use("/api/users", userRoutes);

 //question routes middleware file
 const questionsRoutes = require("../server/routess/questionRoute");


 //question routes middleware
 app.use("/api/questions", authMiddleware, questionsRoutes);

//answer middleware file
const answerRouter = require("../server/routess/answerRoute");


//routes answer midlleware 
app.use("/api/answer", authMiddleware, answerRouter);


async function start(){
    try{
        const result=await dbConnection.execute("select 'test' ")
        app.listen(port)
        console.log("database connection established")
        console.log(`listening on ${port}`)
    } catch(error){
    console.log(error.message)
    }
}
start()

 
