import React from 'react'
import {useGlobalContext} from '../context/globalcontext'
import {Navigate} from 'react-router-dom'

const Protectedroute = ({children}) => {

    const {user} =useGlobalContext()
    if(user){

        return (
            children
          )
    }
    else{
        return (<Navigate to='./landing'></Navigate>)
    }

  
}

export default Protectedroute