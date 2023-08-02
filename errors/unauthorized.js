import {StatusCodes} from 'http-status-codes'
import badrequesterror from './badrequest.js'



class unauthorizederror extends badrequesterror{
    constructor(message){
        super(message)
        this.statusCode=StatusCodes.UNAUTHORIZED
    }
}

export default unauthorizederror