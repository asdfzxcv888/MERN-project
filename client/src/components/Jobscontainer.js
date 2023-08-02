import React from 'react'
import { useGlobalContext } from '../context/globalcontext'
import Job from './job'
import Loading from './Loading'
import Wrapper from '../assets/wrappers/JobsContainer'
import Pagebtncontainer from './Pagebtncontainer'


const Jobscontainer = () => {
  const {getalljobs,jobs,loading,page,totaljobs,search,sort,searchstatus,searchtype,numofpages}=useGlobalContext()


  React.useEffect(
    ()=>{console.log('alljobscalled')
      getalljobs()},[search,sort,searchstatus,searchtype,page])


  if(loading){
  return (
    <div><Loading center={true}></Loading></div>
  )}

  if(jobs.length===0){
    return <Wrapper><h2>No jobs availible..</h2></Wrapper>
  }


  return(<Wrapper>

  <h5>  {totaljobs} job {jobs.length>1 && 's'} found</h5>

  <div className="jobs">{jobs.map((job)=>{return<Job key={job._id} {...job}></Job> })}</div>
  {numofpages > 1 &&<Pagebtncontainer/>}
  </Wrapper>)

}

export default Jobscontainer