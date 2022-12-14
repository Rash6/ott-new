export interface jwtPayload{
    otp:string|number
    email:string
    role:string
    plan:string
}

export interface nodemailer_data_Type{
    otp:string|number
    email:string
}

export interface verify_otp{
    otp:string|number
}

export interface nodemailer_response{
message:string
}