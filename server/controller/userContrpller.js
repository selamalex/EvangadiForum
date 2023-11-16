// const dbConnection = require("../db/dbConfige");

// const bcrypt = require("bcrypt");

// const jwt = require("jsonwebtoken")

// async function register(req, res) {
// 	const { username, firstname, lastname, email, password } = req.body;
// 	if (!username || !firstname || !lastname || !email || !password) {
// 		return res
// 			.status(400)
// 			.json({ msg: "please provide all required informations" });
// 	}

// 	try {
// 		const [user] = await dbConnection.query(
// 			"SELECT username,userid FROM users WHERE username = ? or email =?",
// 			[username, email]
// 		);
// 		if (user.length > 0) {
// 			return res.status(400).json({ msg: "user already existed" });
// 		}
// 		if (password.length < 8) {
// 			return res
// 				.status(400)
// 				.json({ msg: "password must be at least 8 characters" });
// 		}

// 		const salt = await bcrypt.genSalt(10);

// 		const hashedPassword = await bcrypt.hash(password, salt);

// 		await dbConnection.query(
// 			"INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?) ",
// 			[username, firstname, lastname, email, hashedPassword]
// 		);
// 		return res.status(201).json({ msg: "user registered" });
// 	} catch (error) {
// 		console.log(error.message);
// 		return res
// 			.status(500)
// 			.json({ msg: "something went wrong, try again later" });
// 	}
// }

// async function login(req, res) {
// 	const { email, password } = req.body;
// 	if (!email || !password) {
// 		return res.status(400).json({ msg: "please enter all required fields" });
// 	}

// 	try {
// 		const [user] = await dbConnection.query(
// 			"SELECT username,userid,password FROM users WHERE email = ? ",
// 			[email]
// 		);
// 		// console.log(user);
// 		if(user.length==0){
// 			return res.status(400).json({msg: "email deos not exist"})
// 		}

// 		const isMatch = await bcrypt.compare(password,user[0].password)

// 		if(!isMatch){
// 			return res.status(400).json({msg: "invalid credential"})
// 		}
// 		const username = user[0].username;
// 		const userid = user[0].userid;
// 		const token = jwt.sign(
// 			{ username, userid },
// 			"secret",
// 			{ expiresIn: "1d" }
// 		);

// 		return res.status(200).json({msg: "user login successfuly",token, username})


// 	} catch (error) {
// 		console.log(error.message);
// 		return res
// 			.status(500)
// 			.json({ msg: "something went wrong, try again later" });
// 	}
// }

// async function checkUser(req, res) {
// 	const username = req.user.username;
// 	const userid = req.user.userid;
// 	console.log(username, userid);
// 	res.status(200).json({msg: "valid user", userid, username})
// 	// res.json({msg:"user loged in successfully"})
// }

// module.exports = { register, login, checkUser };























//db connection
const dbConnection=require("../db/dbConfige")
const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');
async function register(req,res){
    const{username, firstname, lastname, email,password}=req.body;
    if(!email||!password||!firstname||!lastname||!username){
        return res.status(400).json({msg: "please provide all required information"})
    }
    try{
const [user]= await dbConnection.query("select username,userid from users where username=? or email=?", [username,email])
if(user.length>0){
   return res.status(400).json({msg: "user already exist"})
}
if(password.length<8){
    return res.status(400).json({msg: "password must be 8 characters"})
}
//encrypt the password
const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password, salt)

await dbConnection.query("INSERT INTO users(username,firstname, lastname, email,password) VALUES (?,?,?,?,?)", [username, firstname, lastname, email, hashedPassword]) 

return res.status(201).json({msg:"user created"})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({msg: "please provide all required information"})
    }
}
async function login(req,res){
    const  {email,password}= req.body;
    if(!email||!password){
        return res.status(400).json({msg:"please enter all required fields"});
    }
   try{
const [user]=await dbConnection.query("select username,userid,password from users where email=?", [email])
console.log(user.username);
if(user.length==0){
    return res.status(400).json({msg: "Invalid credential"});
}
// console.log(user);
//compare password
const isMatch=await bcrypt.compare(password, user[0].password);
if(!isMatch){
    return res.status(400).json({msg: "invalid credential"});
}
const username=user[0].username; 
const userid=user[0].userid;
const token=jwt.sign({username,userid}, "secret",{expiresIn: "1d"})

return res.status(200).json({msg: "user login successful", token})




   }catch(error){
    console.log(error.message)
    return res.status(500).json({msg: "something went wrong, try again later!"})
   }
}

function checkUser(req,res){
    const username= req.user.username;
    const userid=req.user.userid;

console.log(userid);
    res.status(200).json({msg: "valid user", userid, username})
}
module.exports={ register, login, checkUser}