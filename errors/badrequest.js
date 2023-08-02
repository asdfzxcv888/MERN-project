import {StatusCodes} from 'http-status-codes'
import customerror from './customerror.js'


class badrequesterror extends customerror{
    constructor(message){
        super(message)
        this.statusCode=StatusCodes.BAD_REQUEST
    }
}


export default badrequesterror