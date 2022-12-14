import { execPath } from "process";
import sinon from "sinon";
import request from 'superagent';
import index from "../index";
import { nodemailer_response } from "../types/types";
import utils from "./utils";

describe.only('test for utils',()=>{
    afterEach(()=>{
        sinon.restore()
    })

    it("jwt should give token",()=>{
        const token=utils.generateJWT('rashmirohini20@gmail.com','abcdef','user')
        expect(token).toBeDefined()
    })

    it('verify jwt should give true on correct token',async ()=>{
        const result=await utils.verifyJWT(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhc2htaW4yMDk2QGdtYWlsLmNvbSIsIm90cCI6ImdoYXoybCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjcwODM2NTI3LCJleHAiOjE2NzEyNjg1Mjd9.LHIO4kKL5DWGVoqPObSMoFDEkXHr8oKBSqWBvct7Hv4'

        )
        expect(result).toEqual({
            email:"rashmin2096@gmail.com",
            exp: 1671268527,
            iat: 1670836527,
            otp:"ghaz2l",
            role:"user",
                          
        })


    })



    it("validate email and should give false if its invalid mail",()=>{
        const result=utils.validateEmail('rashmirohini20@gmailcom');

        expect(result).toBe(false)
    })

    it("send mail should give message successful",async()=>{
        const result:any=await utils.sendMail({
            email:"rash.u.102022@gmail.com",
            otp:"abcdef"
            
        })
        expect(result.message).toBe('success')
    })

    it('send mail should give message unsuccessful on invalid mail',async()=>{
        const result:any=await utils.sendMail({
            email:"",
            otp:""
        })
        expect(result.message).toBe('unsuccess')
    })
})