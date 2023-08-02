import React, { useState } from 'react';

import Barchart from './Barchart';
import Areachart from './Areachart';
import { useGlobalContext } from '../context/globalcontext';
import Wrapper from '../assets/wrappers/ChartsContainer';


const Chartscontainer = () => {
    const[barchart,setbarchart]=useState(true)
    const{monthlyapp:data}=useGlobalContext()
  return (
<Wrapper>
    <h4>Monthly Applications</h4>
    <button type='button' onClick={()=>{setbarchart(!barchart)}}>Toggle Chart</button>
    
    {barchart?
<Barchart data={data}></Barchart>:
<Areachart data={data}></Areachart>
}
</Wrapper> )
}

export default Chartscontainer