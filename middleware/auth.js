import { unauthorizederror,badrequesterror } from "../errors/index.js";
import  jwt  from "jsonwebtoken";


const auth =async(req,res,next)=>{
    const authheader=req.headers.authorization
    if(!authheader||!authheader.startsWith('Bearer')){
        throw new unauthorizederror('you cant access this route')
    }

    const token=authheader.split(' ')[1]
    try {

        console.log('token ' +token);
        const payload=jwt.verify(token,'jwtsecret')
        req.user={userid:payload.userid}
        next()

    } catch (error) {
        throw new badrequesterror('token expired')
    }

}

export default auth