import {Router} from 'express';
import user_controller from '../../controllers/user_controller/user_controller';
const route=Router()
import { user_check_role } from '../../middleware/user_access';

route.get('/getallmovies',user_controller.getmovies)
route.get('/searchid/:id',user_controller.searchMovies)
route.put('/changeplan',user_controller.changeplan)
//route.get('/search',movie_controllers.searchMovies)
//route.get('/searchbymoviename',movie_controllers.singleMovie)


export default route;