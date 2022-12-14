import {Router,Request,Response} from 'express';
const userRole=require('../../middleware/user_access');
import insertMovie from "../../controllers/Admin_controller/admin_controller";


const route=Router();




route.post("/new_content",userRole.check_user_role,insertMovie);



export default route;