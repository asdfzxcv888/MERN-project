import React from 'react'
import { Outlet,Link,Navigate } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import {Bigsidebar,Smallsidebar,Navbar} from '../../components'



const Sharedlayout = () => {
  return (
      <Wrapper>
          <main className='dashboard'>
        <Smallsidebar/>
       
        <Bigsidebar/>



            <div>
            <Navbar/>
            <div className="dashboard-page"><Outlet></Outlet></div>
            </div>
             
          </main>
          

      </Wrapper>
  )
}

export default Sharedlayout