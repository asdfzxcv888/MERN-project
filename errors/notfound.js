import {StatusCodes} from 'http-status-codes'
import badrequesterror from './badrequest.js'



class notfounderror extends badrequesterror{
    constructor(message){
        super(message)
        this.statusCode=StatusCodes.NOT_FOUND
    }
}

export default notfounderror