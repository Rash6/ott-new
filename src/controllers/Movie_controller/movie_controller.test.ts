import sinon from "sinon";
import request from 'supertest';
import jwt from "jsonwebtoken";
import App from "../../index";
import movies_queries from "../../queries/Movies_queries/movies_queries";
import { response } from "express";

describe("testing for get all movies",()=>{
    let query:sinon.SinonStub;
    beforeEach(()=>{
        query=sinon.stub(movies_queries,"getMovies");

    })
    afterEach(()=>{
        query.restore()
    });

    it("get request success with success status message",async()=>{
        query.resolves([{
            test:"test"
        }])
        const res=await request(App).get('/movies/getallmovies');
        console.log(res,"abd")
        expect(res.body.message).toEqual('success')
       
    })

    
})

describe("testing for search movie/by giving any params",()=>{
    let query:sinon.SinonStub;
    beforeEach(()=>{
        query=sinon.stub(movies_queries,"searchMoviesquery");

    })
    afterEach(()=>{
        query.restore()
    });

    it("get movies search results is successfull then received the status message success  ",async()=>{
        query.resolves([{
            test:"test"
        }])
        const res=await request(App).get("/movies/search/?q=Google")
       
        expect(res.body).toEqual({
            message:"success",
            data:[{
                test:"test"
            }]


        })
    })

    it("get movies search results is unsuccessfull then received the status message unsuccess  ",async()=>{
        query.resolves([])
        const res=await request(App).get("/movies/search/?q=dell")
       
        expect(res.body).toEqual({
            message:"unsuccess"   
        })
    })


})

describe("testing for search by only movie name",()=>{
    let query:sinon.SinonStub;
    beforeEach(()=>{
        query=sinon.stub(movies_queries,"singleMovie");

    })
    afterEach(()=>{
        query.restore()
    });


    it("checking for the movie name serached if result is success ",async()=>{
        query.resolves([{
            test:"test"
        }])
        const res=await request(App).get("/movies/searchbymoviename/?q=Google")
       
        expect(res.body).toEqual({
            message:"success",
            movie_data:[{
                test:"test"
            }]
        })

        
    })

    it("checking for the movie name serached if result is unsuccess ",async()=>{
        query.resolves([])
        const res=await request(App).get("/movies/searchbymoviename/?q=dell")
        expect(res.body).toEqual({
            message:"unsuccess" 
        })
    })
    it("checking for the movie name serached if result is unsuccess ",async()=>{
        query.resolves([])
        const res=await request(App).get("/movies/searchbymoviename/?q=")
        expect(res.body).toEqual({
            message:"unsuccess" 
        })
    })


})





 
