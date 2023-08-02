import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import {useGlobalContext  } from '../context/globalcontext';
import links from '../utils/Links';
import { NavLink } from 'react-router-dom';
import Logo from './logo';
import Navlinks from './Navlinks';

export const Smallsidebar = () => {
  const {sidebar,togglesidebar}=useGlobalContext()
  return (
    <Wrapper>
      <div className={sidebar?'sidebar-container show-sidebar':'sidebar-container'}>
        <div className='content'>
          <button className='close-btn' onClick={togglesidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <Navlinks togglesidebar={togglesidebar}></Navlinks>
          
        </div>
      </div>
    </Wrapper>
  );
};

export default Smallsidebar;

