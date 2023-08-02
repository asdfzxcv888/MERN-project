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

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quae nam obcaecati tempora voluptatum magnam quisquam officia quis quod cumque dolorum, sit dolor in? Quibusdam, ipsum iure. Saepe voluptas earum iste aliquam explicabo nemo eos excepturi repudiandae? Quo nihil possimus, ratione voluptas, enim vitae labore saepe soluta rerum iure amet.</p>
           
           <Link to='/register'><button className='btn btn-hero'>Login</button></Link>
            
        </div>
        <img  src={main}  alt='main.img'  className='img main-img'></img>
      </div>

  </Wrapper>
    
  
}






export default Landing