import React from 'react'
import { useGlobalContext } from '../../context/globalcontext';
import{Statscontainer,Loading,Chartscontainer} from '../../components'

const Stats = () => {
  const {showstats,loading,monthlyapp}=useGlobalContext()
  React.useEffect(()=>{showstats()},[])
  if(loading){
  return (
    <Loading></Loading>
  )
}
return (<><Statscontainer></Statscontainer>
{monthlyapp &&<Chartscontainer/>}
</>)
}
export default Stats