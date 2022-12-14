import  {Request,Response} from 'express';
import cookieParser from "cookie-parser"
import login_route from "./routes/Login/login_routes"
import  movie_route from "./routes/Movie/movie_routes";
import admin_route from "./routes/Admin/admin_routes";
import user_route from "./routes/User/User_routes";
require('dotenv').config()
const express=require("express")
const app=express();



const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");
const swaggerUi = require("swagger-ui-express");



app.use(express.json())
app.use(cookieParser())

//app.use("/api-docs",swaggerUi.server,swaggerUi.setup(swaggerDoc))


app.get("/",(req:Request,res:Response)=>{
    res.status(200).send({message:"welcome to ott platform"})
})


//routes
app.use('/login',login_route);

app.use('/movies',movie_route);
app.use('/admin',admin_route)
app.use('/user',user_route)




app.use((req:Request,res:Response)=>{
    res.status(404).send({message:'route not found'})
})
app.listen(process.env.PORT,()=>{
    console.log(`serving the port ${process.env.PORT}`);
})

export default app