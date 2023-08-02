import {StatusCodes} from 'http-status-codes'


class customerror extends Error{
    constructor(message){
        super(message)
    }
}

export default customerror