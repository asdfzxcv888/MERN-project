import React from 'react'
import { useState,useContext,useReducer,useEffect } from 'react'
import { REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,LOGIN_USER_SUCCESS,LOGIN_USER_ERROR,LOGIN_OUT_USER,
    UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS,UPDATE_USER_ERROR,HANDLE_CHANGE,CLEAR_VALUES,
    CREATE_JOB_BEGIN,CREATE_JOB_SUCCESS,CREATE_JOB_ERROR,GET_JOBS_BEGIN,GET_JOBS_SUCCESS,SET_EDIT_JOB
    ,DELETE_JOB_BEGIN,DELETE_JOB_SUCCESS,DELETE_JOB_ERROR,EDIT_JOB_BEGIN,EDIT_JOB_SUCCESS,EDIT_JOB_ERROR,SHOW_STATS_BEGIN,SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,CHANGE_PAGE


} from './actions'

    
import reducer from './reducer'
import axios from 'axios'

let varia =setTimeout(()=>{},0)
const cuser=localStorage.getItem('user')
const ctoken=localStorage.getItem('token')
const userlocation=localStorage.getItem('location')



const AppContext=React.createContext()
export const initialstate={
    loading:false,
    showalert:false,
    alertText:'',
    alertType:'',
    user:cuser? JSON.parse(cuser):null,
    token:ctoken?ctoken:null,
    location:userlocation ? userlocation:'',
    joblocation:userlocation ? userlocation:'',
    sidebar:false,
    isediting:false,
    editjobid:'',
    position:'',
    company:'',
    jobtypeoptions:['full-time', 'part-time', 'remote', 'internship'],
    jobtype:'full-time',
    statusoptions:['interview', 'declined', 'pending'],
    status:'pending',
    jobs:[],
    totaljobs:0,
    page:1,
    numofpages:1,
    stats:[],
    monthlyapp:[],
    search:[],
    searchstatus:'all',
    searchtype:'all',
    sort:'latest',
    sortoptions:['latest','oldest','a-z','z-a'],




}


const Appprovider=({children})=>{
//     console.log('user ',cuser,);
// console.log('token ',ctoken,);
// console.log('location ',userlocation)
    const [state,dispatch]= useReducer(reducer,initialstate)
    const authfetch=axios.create({baseURL:'/api/v1'})
    authfetch.interceptors.request.use((config)=>{
         config.headers['Authorization']=`Bearer ${state.token}`
        return config},(error)=>{return Promise.reject(error)})

        
    authfetch.interceptors.response.use(
        (response)=>{return response},

        (error)=>{
            console.log(error.response)
            if(error.response.status===400){logoutuser()}
            return Promise.reject(error)
        }


        )
    
    const addusertolocalstorage=({newusers,token})=>{
        console.log('from ',{newusers,token});
        localStorage.setItem('user',JSON.stringify(newusers))
         localStorage.setItem('token',token)
         localStorage.setItem('location',newusers.location)
    }
    const removeuserfromlocalstorage=()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')}


        const togglesidebar =()=>{
            dispatch({type:'togglesidebar'})
        }
    


            const clearvalues=()=>{
                dispatch({type:CLEAR_VALUES})
            }
            

            const createjob=async()=>{
                dispatch({type:CREATE_JOB_BEGIN})
                try {
                    const{position,status,joblocation,company,jobtype}=state
                    const data=await authfetch.post('/jobs',{position,status,jobLocation:joblocation,company,jobType:jobtype})
                    dispatch({type:CREATE_JOB_SUCCESS})
                    dispatch({type:CLEAR_VALUES})
                    if(varia){
                        clearTimeout(varia)
                        varia=setTimeout(()=>{return dispatch({type:'reseterror'})},3000)
            
                    }
                  
                    
                } catch (error) {
                 if(error.response.status===401){
                     return
                 }   
                 dispatch({type:CREATE_JOB_ERROR,payload:{msg:error.response.data.msg}})
                }
            }

    const registeruser=async(cur_user)=>{
        dispatch({type:REGISTER_USER_BEGIN})
        try {
            const resp=await axios.post('/api/v1/auth/register',cur_user) 
            const {token,newusers}=resp.data
            dispatch({type:REGISTER_USER_SUCCESS,payload:{token,newusers}})
            console.log({token,newusers});
            addusertolocalstorage({newusers,token})
           

        } catch (error) {
            dispatch({type:REGISTER_USER_ERROR,payload:error.response.data.msg})
            
            console.log(error.response.data.msg);
        }
        if(varia){
            clearTimeout(varia)
            varia=setTimeout(()=>{return dispatch({type:'reseterror'})},3000)

        }

    }

    const loginuser=async(cur_user)=>{
        dispatch({type:LOGIN_USER_BEGIN})

        
            
        try{
            console.log('hello'+cur_user)
            const resp=await axios.post('/api/v1/auth/login',cur_user) 
            const {token,newusers}=resp.data
            dispatch({type:LOGIN_USER_SUCCESS,payload:{token,newusers}})
            addusertolocalstorage({newusers,token})


            console.log(resp.data)


        }
        catch(error){
            dispatch({type:LOGIN_USER_ERROR,payload:error.response.data.msg})
            
            console.log(error);

        }
        if(varia){
                clearTimeout(varia)
                varia=setTimeout(()=>{return dispatch({type:'reseterror'})},3000)
    
            }
       }
   

       const logoutuser=()=>{
        dispatch({type:LOGIN_OUT_USER})
    removeuserfromlocalstorage()}

    
    const displayalert=()=>{
        dispatch({type:'danger'})
        if(varia){
            clearTimeout(varia)
            varia=setTimeout(()=>{return dispatch({type:'reseterror'})},3000)

        }
    }

    


        const updateuser=async(curuser)=>{
            dispatch({type:UPDATE_USER_BEGIN})
           
            try {
                
                 const resp= await authfetch.patch('/auth/update',curuser)
               //  const data=await axios.patch('/api/v1/auth/update',curuser,{headers:{Authorization:`Bearer ${state.token}`}})
                 
            const {token,newusers}=resp.data

               dispatch({type:UPDATE_USER_SUCCESS,payload:{token,newusers}})
                 console.log(resp);
                
            } catch (error) {
                dispatch({type:UPDATE_USER_ERROR,payload:'update failed'})

                if(varia){
                    clearTimeout(varia)
                    varia=setTimeout(()=>{return dispatch({type:'reseterror'})},3000)
        
                }
            }
        }

        const handlechange=({name,value})=>{
            dispatch({type:HANDLE_CHANGE,payload:{name,value}})
        }
        const getalljobs=async()=>{
            const{search,sort,searchstatus,searchtype,page}=state
            let url=`/jobs?page=${page}&status=${searchstatus}&jobType=${searchtype}&sort=${sort}`
            if(search){
                url=url+`&search=${search}`
            }
            dispatch({type:GET_JOBS_BEGIN})
            try {
               const {data}= await authfetch.get(url)
               const{alljobs,totaljobs,numofpages}=data
               dispatch({type:GET_JOBS_SUCCESS,payload:{alljobs,totaljobs,numofpages}})
            } catch (error) {
                console.log(error.response)
            }
          
            
        }
        const seteditjob =(id)=>{
            console.log('set edit called')
            dispatch({type:SET_EDIT_JOB,payload:{id}})

        }
        const editjob=async()=>{
            dispatch({type:EDIT_JOB_BEGIN})
            try {
                const {position,company,jobtype,joblocation,status}=state
                    await authfetch.patch(`/jobs/${state.editjobid}`,{position,company,jobType:jobtype,jobLocation:joblocation,status})
                    dispatch({type:EDIT_JOB_SUCCESS})
                    dispatch({type:CLEAR_VALUES})
                } catch (error) {
                if(error.response.status===401)return
                dispatch({type:EDIT_JOB_ERROR,payload:{msg:error.response.data.msg}})
            }
        }
        const deletejob =async(id)=>{
            dispatch({type:DELETE_JOB_BEGIN})
            try {
                await authfetch.delete(`/jobs/${id}`)
                await getalljobs()
            } catch (error) {
                console.log(error)
                logoutuser()
            }
        }

        const showstats=async()=>{
            dispatch({type:SHOW_STATS_BEGIN})
            try {
                const{data}=await authfetch('/jobs/stats')
                dispatch({type:SHOW_STATS_SUCCESS,payload:{stats:data.defaultstats,monthlyapp:data.monthlyapp}})

                
            } catch (error) {
                console.log(error.response)
                logoutuser()
            }
        }

        const changepage=(page)=>{dispatch({type:CHANGE_PAGE,payload:{page}})}

        const clearfilters=()=>{dispatch({type:CLEAR_FILTERS})}
        React.useEffect(()=>{getalljobs()},[])

    return <AppContext.Provider value={{...state,displayalert,registeruser,loginuser,
        togglesidebar,logoutuser,updateuser,handlechange,clearvalues,createjob,getalljobs,seteditjob,deletejob,editjob,
    showstats,clearfilters,changepage}}>{children}</AppContext.Provider>

}

 const useGlobalContext =()=>{
    return useContext(AppContext)
}
export {Appprovider,useGlobalContext}