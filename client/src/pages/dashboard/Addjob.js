import React from 'react'
import { Row, Alert, Formrowselect } from '../../components';
import { useGlobalContext } from '../../context/globalcontext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';


const Addjob = () => {

  const {showalert,loading,alertText,
    displayalert,
    position,
    company,
    joblocation,
    jobtype,
    jobtypeoptions,
    status,
    isediting,
    statusoptions,
  handlechange,clearvalues,createjob,editjob}=useGlobalContext()
    const handlejob=(e)=>{
      const name=e.target.name
      const value=e.target.value
      handlechange({name,value})
    }



    const handlesubmit=(e)=>{
      e.preventDefault()
      // if(!position||!company||!joblocation){
      //   return displayalert()
      // }
        if(isediting){
            editjob()
         }
         if(!isediting){
          createjob()       }
        
    }
  return (
    <Wrapper>

      <form className='form' onSubmit={handlesubmit}>
        <h3>{isediting?'edit-job':'add-job'}</h3>
        {showalert&&<Alert alertText={alertText}></Alert>}
        <div className="form-center">
         
 
        <Row  nameprop='position' values={position} type='text' onchange={handlejob}></Row>
        <Row  nameprop='company' values={company} type='text' onchange={handlejob}></Row>

        <Row  nameprop='joblocation' values={joblocation} type='text' onchange={handlejob}></Row>
        <Formrowselect  name='status' value={status} handlechange={handlejob} list={statusoptions}></Formrowselect>
        <Formrowselect  name='jobtype' value={jobtype} handlechange={handlejob} list={jobtypeoptions}></Formrowselect>
        <div className="btn-container">

        <button type='submit' className='btn btn-block submit-btn' disabled={loading}>SUBMIT</button>
        <button  className='btn btn-block clear-btn' onClick={(e)=>{e.preventDefault()
        clearvalues()}}>clear</button>

        </div>

        </div>
        

      </form>
    </Wrapper>
  )
}

export default Addjob