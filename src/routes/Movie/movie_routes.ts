import {Router} from 'express';
import movie_controllers from '../../controllers/Movie_controller/movie_controller';
import { user_check_role } from '../../middleware/user_access';
const route=Router()

route.get('/getallmovies',movie_controllers.getmovies)
route.get('/searchid/:id',movie_controllers.searchMovies)
//route.get('/search',movie_controllers.searchMovies)
//route.get('/searchbymoviename',movie_controllers.singleMovie)

route.get('/watchMovie/:id',user_check_role,movie_controllers.watchMovies)


export default route;