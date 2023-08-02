import React from 'react'
import moment from 'moment'

import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/globalcontext';
import Wrapper from '../assets/wrappers/Job';
import Jobinfo from './Jobinfo';

const Job = ({_id,position,jobLocation,jobType,status,company,createdAt}) => {
  const{seteditjob,deletejob}=useGlobalContext()
  let date=moment(createdAt)
  date=date.format('MMM Do,YYYY')
  return (
    <Wrapper>
      <header>
      <div className="main-icon">
        {company.charAt(0)}
      </div>
      <h5>{position}</h5>
      <p>{company}</p>


      </header>


      <div className="content">
        <div className="content-center">
        <Jobinfo icon={<FaLocationArrow />} text={jobLocation} />
      <Jobinfo icon={<FaCalendarAlt />} text={date} />
      <Jobinfo icon={<FaBriefcase />} text={jobType} />
      <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link to='/addjob' className='btn edit-btn'  onClick={()=>{seteditjob(_id)}}>EDIT</Link>
            <button type='button' className='btn delete-btn'  onClick={()=>{deletejob(_id)}}>DELETE</button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job