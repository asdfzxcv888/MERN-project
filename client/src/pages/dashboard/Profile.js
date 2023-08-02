import React from 'react'
import { useState } from 'react';
import { Row, Alert } from '../../components';
import { useGlobalContext } from '../../context/globalcontext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const {user,showalert,displayalert,loading,updateuser}=useGlobalContext()
  const [name,setname]=useState(user?.name)
  const [email,setemail]=useState(user?.email)
  const [lastname,setlastname]=useState(user?.lastname)
  const [location,setlocation]=useState(user?.location)
const handlesubmit=(e)=>{
  e.preventDefault()
  console.log('submitted');
  if(!name||!email){displayalert()}
  updateuser({name,email,lastname,location})

}
 
  return (
    <Wrapper>
          <form className='form' onSubmit={handlesubmit}>
            {showalert&&<Alert  alertText={'name and email cannot be empty'}/>}
            <h3>your profile</h3>
            <div className="form-center">
            <Row type={'text'} nameprop={'name'} values={name} onchange={(e)=>{setname(e.target.value)}} ></Row>
            <Row type={'text'} nameprop={'lastname'} values={lastname} onchange={(e)=>{setlastname(e.target.value)}} ></Row>
            <Row type={'email'} nameprop={'email'} values={email} onchange={(e)=>{setemail(e.target.value)}} ></Row>
            <Row type={'text'} nameprop={'location'} values={location} onchange={(e)=>{setlocation(e.target.value)}} ></Row>
            

            </div>
            <button className='btn btn-block' type='submit' disabled={loading}>
              {loading?'please wait...':'save changes'}
            </button>

          </form>

    </Wrapper>
  )
}

export default Profile