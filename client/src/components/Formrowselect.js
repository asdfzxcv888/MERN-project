import React from 'react'

const Formrowselect = ({labeltext,name,value,handlechange,list}) => {
    
  return (
        <div className="form-row">

        <label htmlFor={name}   className='job-label'>{labeltext||name}</label>
        <select name={name} className='form-select'  onChange={handlechange} value={value}>

        {list.map((item,index)=>{return <option key={index} value={item}>{item}</option>})}

        </select>
        </div>  )
}

export default Formrowselect