import buyan from 'bunyan';
import jwt,{JwtPayload} from 'jsonwebtoken'
const nodemailer= require('nodemailer');
import { jwtPayload,nodemailer_data_Type } from '../types/types';
import {v4 as uuid} from 'uuid';
const hbs:any=require('hbs');
require('dotenv').config()



const log=buyan.createLogger({name:'ott_platform',request_id:uuid()})


function generateJWT(
    email:string,
    otp:number|string,
    role:string,
    plan:string,
    expiresIn:string=`1d`
){
    return jwt.sign({email,otp,role,plan},process.env.jwt_secret as string,{
        expiresIn:expiresIn,
    })
}



function verifyJWT(token:string){
    return jwt.verify(
        token,
        process.env.jwt_secret as string,
        (err,decoded)=>{
            if(err){
                return false
            }
            return decoded
        } 
    )as JwtPayload|boolean|void
}





function validateEmail(mail:string){
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return true

    }
    return false
}


async function sendMail(data:nodemailer_data_Type){
    console.log(process.env.nodemailer_email,process.env.nodemailer_password)
    try{
        let transport=nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user:process.env.nodemailer_email,
                pass:process.env.nodemailer_password,
            },
        })

        const content=`
        <div style="margin:auto;">
        <h3>Hello,{{email}}</h3>
        <p>Here is your one time password </p>
        <h1>{{otp}}</h1>
        <p>Note: Please Note that otp is one time use only and it will expires in 2 mins.</p>
        <p>If you did not do this please reset your password immediately.</p>
    </div> `

    const template=hbs.compile(content);
    let info=await transport.sendMail({
        from:'ott ottplatform@gmail.com',
        to:data.email,
        subject:'login OTP',
        html:template({
            useremail:data.email,
            otp:data.otp,
        }),

    })
    return {message:'success'}
    }catch(e){
        console.log(e)
        return {message:'unsuccess'}
    }
}


export default { log, generateJWT, verifyJWT, validateEmail,sendMail}