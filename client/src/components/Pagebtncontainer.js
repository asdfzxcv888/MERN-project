import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useGlobalContext } from '../context/globalcontext';
const Pagebtncontainer = () => {
  const{numofpages,page,changepage}=useGlobalContext()
  const pages=Array.from({length:numofpages},(_,index)=>{return index+1})
  const nextpage=()=>{
    let newpage=page+1
    if(newpage>numofpages){newpage=1}
    changepage(newpage)
  }
  const prevpage=()=>{
    let newpage=page-1
      if(newpage<1){newpage=numofpages}
      changepage(newpage)

  }
  return (
<Wrapper >
  <button className='prev-btn' onClick={prevpage}><HiChevronDoubleLeft/>prev</button>
  <div className="btn-container">{pages.map((item)=>{return <button key={item} type='button' className={item===page?'pageBtnactive':'pageBtn'} onClick={()=>changepage(item)}>{item}</button>})}</div>
  <button className='next-btn' onClick={nextpage}><HiChevronDoubleRight/>next</button>

   </Wrapper> )
}

export default Pagebtncontainer