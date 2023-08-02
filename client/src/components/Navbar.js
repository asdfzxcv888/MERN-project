import React from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import {BiAlignLeft,BiUserCircle,BiCaretDown} from 'react-icons/bi'
import Logo from './logo'
import {useGlobalContext} from '../context/globalcontext'


const Navbar = () => {
const {togglesidebar,user,logoutuser}=useGlobalContext()

const[dropdown,setdropdown]=React.useState(false)
  return (
      <Wrapper>   
        <div className="nav-center">
        <button type='btn' className='toggle-btn' onClick={()=>{togglesidebar()}}> <BiAlignLeft/></button>

        </div>
        <div><Logo></Logo>
        <h2 className='logo-text'>navigate</h2>
        </div>
        <div className="btn-container">
          <button className='btn' type='btn'  onClick={()=>{setdropdown(!dropdown)}}><BiUserCircle/>{user.name}<BiCaretDown/></button>
          <div className={dropdown?'dropdown show-dropdown':'dropdown'}>
          <button className='dropdown-btn' type='btn'  onClick={logoutuser}>logout</button>

          </div>
        </div>
      </Wrapper>
   
  )
}

export default Navbar