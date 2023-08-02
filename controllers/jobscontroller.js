import { StatusCodes } from 'http-status-codes'
import {badrequesterror,unauthorizederror,notfounderror} from '../errors/index.js'
import jobs from '../models/jobs.js'
import checkpermissions from '../utils/checkpermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'

const showstats=async(req,res)=>{
    

    let stats=await jobs.aggregate([{$match:{createdBy:new mongoose.Types.ObjectId(req.user.userid)}},
        {$group:{_id:'$status',count:{$sum:1}}}])
        console.log(stats)
        stats=stats.reduce((acc,curr)=>{const{_id,count}=curr
    acc[_id]=count
return acc},{})

const defaultstats={
     pending:stats.pending||0,
     interview:stats.interview||0,

     declined:stats.declined||0


}


let monthlyapp=await jobs.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userid) } },
    {
      $group: {
        _id: {
          year: {
            $year: '$createdAt',
          },
          month: {
            $month: '$createdAt',
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);



  monthlyapp = monthlyapp
  .map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    // accepts 0-11
    const date = moment()
      .month(month - 1)
      .year(year)
      .format('MMM Y');
    return { date, count };
  })
  .reverse();



  console.log(monthlyapp);
    res.status(StatusCodes.OK).json({defaultstats,monthlyapp})
}

const createjob=async(req,res)=>{
    console.log('server side create job')
    const {company,position,jobLocation,status}=req.body
    if(!company||!position){
        throw new badrequesterror('please provide all values')
    }
    try {
        const job=await jobs.create({company,position,jobLocation,createdBy:req.user.userid,status})
        res.status(StatusCodes.CREATED).json({job})
    } catch (error) {
        console.log(error);
        
    }

}
const getalljobs=async(req,res)=>{
        const {status,jobType,sort,search}=req.query
        const queryobject={createdBy:req.user.userid}
        if(status){
        if(status!=='all'){
            queryobject.status=status
        }}

        if(jobType){
            if(jobType!=='all'){
                queryobject.jobType=jobType
            }
        }
       
        if(search){
            queryobject.position={$regex:search,$options:'i'}
        }
    try{
        console.log(queryobject)
      let result=   jobs.find(queryobject)
      if (sort === 'latest') {
        result = result.sort('-createdAt');
      }
      if (sort === 'oldest') {
        result = result.sort('createdAt');
      }
      if (sort === 'a-z') {
        result = result.sort('position');
      }
      if (sort === 'z-a') {
        result = result.sort('-position');
      }

      const page=Number(req.query.page)||1
      const limit=Number(req.query.limit)||10

      const skip=(page-1)*limit
      result=result.skip(skip).limit(limit)

      const alljobs= await result
      const totaljobs=await jobs.countDocuments(queryobject)
      const numofpages=Math.ceil(totaljobs/limit)
        res.status(StatusCodes.OK).json({alljobs,totaljobs,numofpages})
    }catch(error){
        console.log(error)
    }
    
}
const updatejob=async(req,res)=>{
    console.log('initial')
    console.log(req.body)
    
    const{id:jobId}=req.params
    const{company,position}=req.body
    if(!company||!position){throw  new badrequesterror('please provide required values')}
    const job=await jobs.findOne({_id:jobId})
    if(!job){throw new notfounderror('no such job exists')}
    checkpermissions(req.user,job.createdBy)

    const updatedjob=await jobs.findOneAndUpdate({_id:jobId},req.body,{new:true,runValidators:true})
    console.log('final')
    console.log(updatedjob)
    res.status(StatusCodes.OK).json({updatedjob})
}
const deletejob=async(req,res)=>{
    const{id:jobId}=req.params
   
    const job=await jobs.findOne({_id:jobId})
    console.log(req.user.userid,' ',job.createdBy.toString())
    if(!job){throw new notfounderror('no such job exists')}
    checkpermissions(req.user,job.createdBy)

    await jobs.findOneAndDelete({_id:jobId})
    res.status(StatusCodes.OK).json({msg:'job has been removed'})
}



export {createjob,updatejob,getalljobs,deletejob,showstats}