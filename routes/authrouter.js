import express from "express"
import {login,register,update} from '../controllers/authcontroller.js'
import authmiddleware from '../middleware/auth.js'
import rateLimiter from 'express-rate-limit';


const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 10,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  });
  


const router=express.Router()

router.route('/register').post(apiLimiter,register)

router.route('/update').patch(authmiddleware,update)

router.route('/login').post(apiLimiter,login)

export default router