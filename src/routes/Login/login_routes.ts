import {Router,Request,Response} from 'express';
import user_controller from '../../controllers/user_controller/user_controller';
const route=Router();


route.post("/get_otp",user_controller.get_otp)
route.post('/verify', user_controller.login_user)

export default route;
