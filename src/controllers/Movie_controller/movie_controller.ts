import { NextFunction, Request,Response} from 'express';
//import movies_queries from '../../queries/Movies_queries/movies_queries';
import jwt from 'jsonwebtoken'
import { nextTick } from 'process';
import movie_query from '../../queries/Movies_queries/movies_queries';
import CustumError from '../../utils/errorClass';

//get all movies
async function getmovies(req:Request,res:Response){
    const movie_list=await movie_query.getMovies()
    try{
        const movie_list=await movie_query.getMovies()
       
        res.status(200).send({message:'success',movies:movie_list})
    }catch(err){
        
        res.status(500).send({message:'unsuccess'})

     }
}

//get movies by id

async function searchMovies(req:Request,res:Response,next:NextFunction){
    // console.log(req.params)
    // const {q}=req.params;
    // console.log(q)
    try{
        console.log(req.params)
        const {id}=req.params
        // console.log(id,"qqqqq")
        const single_movie_data=await movie_query.searchMoviesquery(id,"all")
        console.log(single_movie_data,"movieda")
        if(single_movie_data.length > 0){
        res.status(200).send({message:'success',movie_data:single_movie_data})
        }else{
            
            // res.status(500).send({message:"unsuccess"})
            throw new CustumError("data_not_found","unsuccess")
        }

    }catch(er){
        console.log(er,"err")
        next(er)
        // res.status(500).send({message:"unsuccess"})
    }
}

async function watchMovies(req:Request,res:Response){
    try{
        console.log("entered")
        const {id}=req.params
        const auth=req.headers.authorization
        const token= auth?.split(" ")[1] || "tpoken"
        const decoded:any=jwt.verify(token,"plural");
        console.log(id,decoded.plan)
        const single_movie_data=await movie_query.searchMoviesquery(id,decoded.plan)
        if(single_movie_data.length > 0){
        res.status(200).send({message:'success',movie_data:single_movie_data})
        }else{
            res.status(500).send({message:"unsuccess"})
        }

    }catch(er){
        res.status(500).send({message:"unsuccess"})
    }
}


// async function singleMovie(req:Request,res:Response){
//     try{
//         const {q}=req.query
//         const single_movie_data=await movie_query.singleMovie(q)
//         if(single_movie_data.length>0){
//         res.status(200).send({message:'success',movie_data:single_movie_data})
//         }else{
//             res.status(500).send({message:"unsuccess"})
//         }

//     }catch(er){
//         res.status(500).send({message:"unsuccess"})
//     }

// }



export default {getmovies,searchMovies,watchMovies}