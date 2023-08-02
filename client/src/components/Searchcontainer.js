import React from 'react'

import { Row, Formrowselect } from '.';
import { useGlobalContext } from '../context/globalcontext';
import Wrapper from '../assets/wrappers/SearchContainer';
const Searchcontainer = () => {
  const {
    loading,
    search,
    searchstatus,
    searchtype,
    sort,
    sortoptions,
    statusoptions,
    jobtypeoptions,
    handlechange,
    clearfilters,
  } = useGlobalContext();

  const handleSearch = (e) => {
    if (loading) return;
    handlechange({ name: e.target.name, value: e.target.value });
  };


  const handlesubmit=(e)=>{
    e.preventDefault()
    clearfilters()
  }


  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        {/* search position */}
        <div className='form-center'>
          <Row
            type='text'
            nameprop='search'
            values={search}
            onchange={handleSearch}
          ></Row>
          {/* rest of the inputs */}
          <Formrowselect labeltext='status' name='searchstatus' value={searchstatus}
          handlechange={handleSearch} list={[...statusoptions,'all']}></Formrowselect>

        <Formrowselect labeltext='type' name='searchtype' value={searchtype}
          handlechange={handleSearch} list={[...jobtypeoptions,'all']}></Formrowselect>

        <Formrowselect  name='sort' value={sort}
          handlechange={handleSearch} list={sortoptions}></Formrowselect>
          <button className='btn btn-block btn-danger' disabled={loading} onClick={handlesubmit}>Clearvalues</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Searchcontainer