import { NextFunction, Request,Response} from 'express';
import Movies_queries from '../../queries/Movies_queries/movies_queries';



async function insertMovie(req:Request,res:Response,next:NextFunction){
let payload = req.body 
try{
let data = await Movies_queries.createMovie(payload) 

res.status(200).send({message:'created'})


}catch(err){
    next(err)

    // res.status(500).send({message:'unsuccess'})
}

}

export default insertMovie