import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";

export const check_user_role=(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try{
        const auth=req.headers.authorization
        const token= auth?.split(" ")[1] || "tpoken"
        const decoded:any=jwt.verify(token,"plural");
        if(decoded.role==="admin"){
            next();
        }else{
            res.status(401).send({message:"Access denied"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send({message:"something went wrong",status:false});
    };
}


export const user_check_role=(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try{
        const auth=req.headers.authorization
        const token= auth?.split(" ")[1] || "tpoken"
        const decoded:any=jwt.verify(token,"plural");
        
        if(decoded.role==="user"){
            next();
        }else{
            res.status(401).send({message:"Access denied"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send({message:"something went wrong",status:false});
    };
}