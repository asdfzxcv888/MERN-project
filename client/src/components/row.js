import React from 'react'

const Row = ({type,nameprop,onchange,values,labeltext}) => {
  
  return (
    <div  className='form-row'>
                    
    <label  className='form-label'>{nameprop}</label>
    <input  className='form-input' name={nameprop}  type={type} value={values} onChange={(e)=>{onchange(e)}  }></input>

    </div>
  )
}

export default Row