import React from 'react'
import {Link} from 'react-router-dom'
import image from '../assets/images/not-found.png'
import Wrapper from '../assets/wrappers/ErrorPage'


const Error = () => {
  return (<Wrapper>

        <div>
        <h4>page not found</h4>
            <img src={image}></img>
           
        <div><Link to='/'><h4>Back to home</h4></Link></div>
    </div>
  </Wrapper>
   
  )
}

export default Error