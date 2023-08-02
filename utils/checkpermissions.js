import{unauthorizederror} from '../errors/index.js'
const checkpermissions=(requestuser,resourceuserid)=>{
    if(requestuser.userid!==resourceuserid.toString()){
        throw new unauthorizederror('not authorized to access')

    }
    else{
    return}
}
export default checkpermissions