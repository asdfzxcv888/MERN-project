import {StatusCodes} from 'http-status-codes'

const errormiddleware=(err,req,res,next)=>{
  console.log('err stat code '+err.statusCode);
  // console.log('err stat msg '+err.message);

    console.log('error middleware is invoked');
    const defaulterror={
        status:err.statusCode||StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message||'smth went wrong try later'
    }

      if(err.name==='ValidationError'){
          defaulterror.status=StatusCodes.BAD_REQUEST
          defaulterror.msg=Object.values(err.errors).map((item)=>item.message).join(',')
      }
      if(err.code===11000){
          console.log('works');
          defaulterror.status=StatusCodes.INTERNAL_SERVER_ERROR,
            defaulterror.msg=`provide unique ${Object.keys(err.keyValue)}`
      }
    //   console.log('final');
      res.status(defaulterror.status).json({msg:defaulterror.msg})
      //   res.status(defaulterror.status).json({msg:err})
}
export default errormiddleware