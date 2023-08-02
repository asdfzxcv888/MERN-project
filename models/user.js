import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import validator from 'validator'
import banana from 'jsonwebtoken'

const Userschema=new mongoose.Schema({

    name:{type:String  ,required:[true,'please provide name'], minlength:3,maxlength:20,trim:true,},
    email:{type:String  ,required:[true,'please provide email'],
    validator:{validate:validator.isEmail,
    message:'please proviide a valid email'},
    unique:true,},

    password:{type:String  ,required:[true,'please provide password'],minlength:6,select:false},
    lastname:{type:String  , maxlength:20,trim:true, default:'lastname'},
    location:{type:String  , maxlength:20,trim:true, default:'city'},




})

Userschema.methods.createJWT=function(){
        return banana.sign({userid:this._id},'jwtsecret',{expiresIn:'1d'})
}
Userschema.methods.comparepasswords= async function(userpassword,actualpassword){
   console.log(this.password)
    const ismatch=await bcrypt.compare(userpassword,this.password)
    return ismatch
}

Userschema.pre('save' ,async function(){
    if(!this.isModified('password')){return}
    
    const salt =await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)

})
export default mongoose.model('user',Userschema)