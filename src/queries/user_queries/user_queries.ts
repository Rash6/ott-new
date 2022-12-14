// import  userdata  from '../../server/db/connection';
const userdata =require('../../server/db/connection')


async function changeplan(email:string,plan:string){
   const data=await userdata
   .where({email:email})
   .update({plan:plan})
   .from('users')
   
   return data
}

async function get_user_email(email:string){
    try{
        const user=await userdata
        .select('*')
        .where('email',email)
        .from('users')
        .first()
        if (!user.email){
            return {message:'not found'}
        }
        return {...user,message:"success"}
    }catch(err:any){
        return {message:'unsuccess'}
    }
}

async function get_user_role(role:string){
    try{
        const user_role=await userdata.select('*')
        .where('role',role)
        .from('users')
        .first()
        if(!user_role.role){
            return {message:'not found'}
        }
        return{...user_role,message:"success"}
    }catch(err:any){
        return {message:"unsuccess"}
    }
}

async function update_user_token(email: string, token: string) {
    try {
        const user = await userdata('users')
            .update({ token: token })
            .where('email', email)

        return { ...user, message: 'success' }
    } catch (err) {
        return { message: 'unsuccess' }
    }
}

async function getMovies(){
    try{

        const data= await userdata.select('*').from('movies')
        return {...data,message:'success'}
    }catch(err){
       
        return {message:'unsuccess'}
    }
}
async function searchMoviesquery(query:any){
    
    const data = await userdata('movies')
    .where({movie_id : query})
    .returning('*')
    return data
}
export default { get_user_email, update_user_token,get_user_role,getMovies,searchMoviesquery,changeplan }