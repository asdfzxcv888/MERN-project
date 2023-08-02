import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { FaTimes } from 'react-icons/fa';
import {useGlobalContext  } from '../context/globalcontext';

import Logo from './logo';
import Navlinks from './Navlinks';

const Bigsidebar = () => {
  const {sidebar,togglesidebar}=useGlobalContext()
  return (
      <Wrapper> 
        <div className={sidebar?'sidebar-container show-sidebar':'sidebar-container'}>
          <div className="context">
          <header>
            <Logo/>
          </header>
          <Navlinks/>
          </div>
         
          </div>   
      </Wrapper>
  )
}

export default Bigsidebar