import user_queries from "../../queries/user_queries/user_queries";
require('dotenv').config
 import { Request,Response} from 'express';
import { request } from 'http';
 import jwt,{JwtPayload} from 'jsonwebtoken';
 import {jwtPayload} from "../../types/types"
 const otpgenerator=require('otp-generator');
import utils from "../../utils/utils";



async function login_user(req:Request,res:Response){
    const { email,otp }=req.body
    utils.log.info('user in login route')

    try{
        if(!email||!otp){
            return res.status(400).send({
                message:'please enter valid email and otp',
            })
        }
    

    const user_data=await user_queries.get_user_email(email)
    //const user_role=await user_queries.get_user_role(role)

    if(user_data.message=='not found'){
        return res.status(404).send({message:'user not found'})
    }

    if(user_data.message=='unsuccess'){
        return res.status(400).send({message:'email is not valid'})

    }

    if(!user_data.token){
        return res.status(401).send({message:'please click on get otp'})
    }


    const verify_otp=utils.verifyJWT(user_data.token) as JwtPayload
    if(verify_otp.otp!=otp){
        return res.status(401).send({message:'please enter correct otp'})

    }

    const jwt=utils.generateJWT(email,otp,user_data.role,user_data.plan)
    res.cookie("accessToken",jwt,{
        httpOnly:true,
    });

    res.status(200).send({message:'success',token:jwt})


}catch(err){
    res.status(500).send({
        message:'something happened internally please try again',
    })
}
}

async function get_otp(req: Request, res: Response) {
    const { email } = req.body
    try {
        if (!email || !utils.validateEmail(email)) {
            return res
                .status(400)
                .send({ message: 'please enter a valid email address' })
        }
        const user_data = await user_queries.get_user_email(email)
        if (user_data.message === 'not found') {
            return res.status(404).send({ message: 'user not found' })
        }

        if (user_data.message == 'unsuccess') {
            return res
                .status(400)
                .send({ message: 'please enter a valid email id' })
        }

        const otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
        })
        const token = utils.generateJWT(user_data.email, otp, user_data.role,user_data.plan)

        let update_result: any = await user_queries.update_user_token(
            email,
            token
        )

        if (update_result.message == 'unsuccess') {
            return res
                .status(500)
                .send({ message: 'somethingsss happened internally' })
        }

        const result: any = await utils.sendMail({
            email,
            otp,
        })
        if (result.message === 'unsuccess') {
            return res.status(500).send({
                message: 'cant able to sendmail',
            })
        }

        res.status(200).send({ message: 'successfully message sended' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'something happened internally' })
    }
}

async function getmovies(req:Request,res:Response){
    const movie_list=await user_queries.getMovies()
    try{
        const movie_list=await user_queries.getMovies()
       
        res.status(200).send({message:'success',movies:movie_list})
    }catch(err){
        
        res.status(500).send({message:'unsuccess'})

     }
}

//get movies by id

async function searchMovies(req:Request,res:Response){
    // console.log(req.params)
    // const {q}=req.params;
    // console.log(q)
    try{
        console.log(req.params)
        const {id}=req.params
        console.log(id,"qqqqq")
        const single_movie_data=await user_queries.searchMoviesquery(id)
        if(single_movie_data.length > 0){
        res.status(200).send({message:'success',movie_data:single_movie_data})
        }else{
            res.status(500).send({message:"unsuccess"})
        }

    }catch(er){
        res.status(500).send({message:"unsuccess"})
    }
}

async function changeplan(req:Request,res:Response){
    const {email,plan}=req.body
    try{
        if(!req.headers["authorization"]){
           return res.send({message:"unauthorized"})
        }else
        {   

         const auth=req.headers.authorization
        const token= auth?.split(" ")[1] || "tpoken"
        const decoded:any=jwt.verify(token,"plural");
        
        if(decoded.plan!=plan){
            const user=await user_queries.changeplan(email,plan)
            return res.send({message:"plan changed"})
        }
        else if(decoded.plan===plan){
            return res.send({message:"not required for plan change"})
        }
    }

    }catch(err){
        return res.status(400).send({message:err})
    }

}




export default { login_user, get_otp,getmovies,searchMovies,changeplan}



