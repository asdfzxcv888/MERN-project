import React from 'react'
import main from '../assets/images/main.svg'
import {Logo} from '../components'

import styled from 'styled-components'
import Wrapper from '../assets/wrappers/LandingPage'
import {Navigate} from 'react-router-dom'
import {Link} from 'react-router-dom'

const Landing = () => {
  return <Wrapper>
      <nav><Logo></Logo></nav>
      <div   className='container page'>
        <div   className='info'>
            <h1>job<span>tracking</span>app</h1>

            <p>We are thrilled to welcome you to our innovative job application and management site, where your career journey begins or takes a new and exciting turn! Our platform is designed with you in mind, aiming to simplify and enhance every step of your job application and management process
Embark on a seamless job search experience that empowers you to discover exciting opportunities tailored to your skills and aspirations.
</p>
           
           <Link to='/register'><button className='btn btn-hero'>Login</button></Link>
            
        </div>
        <img  src={main}  alt='main.img'  className='img main-img'></img>
      </div>

  </Wrapper>
    
  
}






export default Landing
