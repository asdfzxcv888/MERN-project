import {Error,Landing,Register,Protectedroute} from "./pages"

import styled from 'styled-components'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import { Profile,Sharedlayout,Stats,Alljobs,Addjob} from './pages/dashboard'
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route  path="/"  element={<Protectedroute><Sharedlayout/></Protectedroute>}>
        <Route path="/addjob" element={<Addjob></Addjob>}></Route>
        <Route path="/alljobs" element={<Alljobs></Alljobs>}></Route>
        <Route path="/" element={<Stats></Stats>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>


        </Route>
        <Route  path="/register" element={<Register></Register>}></Route>


        <Route  path="/landing" element={<Landing/>}></Route>
        <Route  path="*" element={<Error/>}></Route>


      </Routes>
    </BrowserRouter>    
  );
}

export default App;
