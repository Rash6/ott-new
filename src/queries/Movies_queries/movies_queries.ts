const MoviesDB=require( "../../server/db/connection");


async function getMovies(){
    try{

        const data= await MoviesDB.select('*').from('movies')
        return {...data,message:'success'}
    }catch(err){
       
        return {message:'unsuccess'}
    }
}


// async function getMoviesbyid(query:any){
//     console.log(query)
//     const data = await MoviesDB('movies')
//     .where(MoviesDB.raw(`(LOWER(movies.movie_id)) ILIKE ?`, [`%${query}%`]))
//     .returning('*')
//     console.log(data,"shjk")
//     return data
// }

async function searchMoviesquery(query:any,plan:string){
   
    const data = await MoviesDB('movies')
    .where({movie_id : query})
    if(plan==="all") return data
    if(data[0].access_plan==="basic") return data
    else if(plan==="premium") return data
    else return "Buy premium plan for this movie"
    
}

async function createMovie(payload:any){
    let data = await MoviesDB('movies').insert(payload).returning('*')
    return data
}

// async function singleMovie(query:any){
//     //console.log(query)
//    const data= await MoviesDB('movies')   
//    .where(MoviesDB.raw(`(LOWER(movies.movie_name)) ILIKE ?`, [`%${query}%`]))
//    .returning('*');
//     return data
// }



export default  { getMovies, searchMoviesquery , createMovie}