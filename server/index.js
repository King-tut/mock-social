import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import nodemon from "nodemon";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import multer from "multer";
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import dotenv from "dotenv"
import { fileURLToPath } from "url";
import {register} from "./controllers/auth.js"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import postRoutes from "./routes/posts.js"
//import { verify } from "crypto";
import {createPost} from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js"
import Post from "./models/Post.js"
import {users, posts} from "./data/index.js"

const __filename = fileURLToPath(import.meta.url)

const __dirname  = path.dirname(__filename)


dotenv.config()
let app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json({limit:"30mb", extended: true }));
app.use(bodyParser.urlencoded({extended: true, limit: "30mb"}));
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

//File storage

const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null, "public/assets")
    },
    filename: function(req,file, cb){
        cb(null, file.originalname)

    }
});

const upload = multer({storage});

//Routes with files

app.post("/auth/register", upload.single('picture'), register)
app.post("/posts", verifyToken, upload.single('picture'),createPost)

//Auth routes 

app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

//DB connection 
const PORT  = process.env.PORT || 6000
mongoose.connect(process.env.MONGO_URL)
.then(() =>{
    app.listen(PORT, () =>{
        console.log(`The server is running on port ${PORT}`)
        //User.insertMany(users)
        //Post.insertMany(posts)
    })
}).catch(err => console.log(err))







app.post("/register", (req, res)=>{
    console.log(req.body)

})

