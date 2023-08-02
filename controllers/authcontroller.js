import useroo from '../models/user.js'
import {StatusCodes} from 'http-status-codes'
import {badrequesterror,unauthorizederror} from '../errors/index.js'



const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        throw new badrequesterror('incomplete details')
    }

    const users=await useroo.findOne({email}).select('+password')
    
    if(!users){
        throw new unauthorizederror('invalid credentials')
    }
    
    const as=await users.comparepasswords(password,users.password)
    
    if(as){
        users.password=undefined
        const token=users.createJWT()
        res.json({newusers:users,token})

    }else{    throw new unauthorizederror('incorrect password please try again')
}
    }



const register=async(req,res,next)=>{
    
    const{name,password,email}=req.body
    if(!name||!email||!password){
        throw new badrequesterror('please provide all bad values')
    }


    
    const userexists=await useroo.findOne({email})
    if(userexists){
        throw new badrequesterror('user already exists use different email id')
    }
    
      const users= await useroo.create(req.body)
      const token =users.createJWT()
      const newusers={id:users.id,email:users.email,name:users.name,lastname:users.lastname,location:users.location}
      

      res.json({newusers,token})
       
    
    
    }


const update=async(req,res)=>{
    const {email,name,lastname,location}=req.body
    if(!name||!email){
        throw new badrequesterror(`${name?'':'name '}` + `${email?'':'email '}` +'cannot be empty')
    }
    const user=await useroo.findOne({_id:req.user.userid})
    user.email=email
    user.name=name
    if(location){
        user.location=location
    }
    if(lastname){
        user.lastname=lastname
    }
   await  user.save()
const token=await user.createJWT()
    res.json({newusers:user,token})
}



export {login,register,update}