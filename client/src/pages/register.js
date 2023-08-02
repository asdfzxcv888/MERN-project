import React, { useEffect } from 'react'
import {Alert,Logo,Row} from '../components'
import {useNavigate} from 'react-router-dom'

import Wrapper from '../assets/wrappers/RegisterPage'
import { useGlobalContext } from '../context/globalcontext'
const Initialstate ={
    'name':'',
    'email':'',
    'password':'',
    'alreadymember':false,
    
}

const Register = () => {
    const navigate=useNavigate()
    const[values,setvalues]=React.useState(Initialstate)

    const {user,loading,showalert,displayalert,alertText,alertType,registeruser,loginuser} =useGlobalContext()
 const onsubmit=(e)=>{
        e.preventDefault()
        const{name,email,password,alreadymember}=values
        if(alreadymember){
            if(!email||!password){displayalert()}
            loginuser({name,email,password,alreadymember})
        }
        if(!alreadymember){
            if(!email||!password||!name){displayalert()}
            registeruser({name,email,password,alreadymember})
            
        }
     

 }


 const onchange=(e)=>{
     
     
     
     setvalues({...values,[e.target.name]:e.target.value})

 }

 const changemember=()=>{
     setvalues({...values,alreadymember:!values.alreadymember})
 }

useEffect(()=>{
    if(user){setTimeout(() => {
    navigate('/')
}, 3000);}},[navigate,user])
 
 
 
    return (<>
      <Wrapper  className='full-page'>
          
              <form className='form'  onSubmit={onsubmit}>
                  <Logo></Logo>
                  <h4>login</h4>
                  {showalert&&<Alert  alertType={alertType} alertText={alertText}></Alert>}
                    {!values.alreadymember && <Row nameprop='name' type='text' onchange={onchange} values={values.name}></Row>} 

                  <Row nameprop='email' type='email' onchange={onchange} values={values.email}></Row> 
                  
                  <Row nameprop='password' type='password' onchange={onchange} values={values.password}></Row> 

                  
                  <button  type='submit' disabled={loading} >{values.alreadymember?'login':'Register'}</button>
                  <p>{!values.alreadymember?'already a member?':'Not a Member yet?'}<button type='button' onClick={changemember}>{!values.alreadymember?'Login':'Register'}</button></p>

              </form>



      </Wrapper>

      </>


  )
}

export default Register