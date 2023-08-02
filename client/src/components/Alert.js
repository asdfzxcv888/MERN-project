import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalcontext'


const Newwrap=styled.h4`
color: gray;
font-size: 2rem;

text-align:center;
background-color: lightpink;


`
const  Alert = ({alertType,alertText}) => {
  return (
    <Newwrap>{alertText}</Newwrap>
  )

 

}




export default Alert