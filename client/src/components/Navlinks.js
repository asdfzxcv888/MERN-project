import React from 'react'
import links from '../utils/Links';
import { NavLink } from 'react-router-dom';


const Navlinks = ({togglesidebar}) => {
  return (
    <div className='nav-links'>
        {links.map((item)=>{return <NavLink 
         className={({isActive})=>isActive?'nav-link active':'nav-link'}
         key={item.id} to={item.path} onClick={togglesidebar}>
            <span className='icon'>{item.icon}</span>{item.text}</NavLink>})}</div>
  )
}

export default Navlinks