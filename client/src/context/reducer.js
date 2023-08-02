import { 
    REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,LOGIN_USER_SUCCESS,LOGIN_USER_ERROR ,LOGIN_OUT_USER,
    UPDATE_USER_BEGIN,UPDATE_USER_SUCCESS,UPDATE_USER_ERROR,HANDLE_CHANGE,CLEAR_VALUES,
    CREATE_JOB_BEGIN,CREATE_JOB_SUCCESS,CREATE_JOB_ERROR,GET_JOBS_BEGIN,GET_JOBS_SUCCESS,SET_EDIT_JOB,
    DELETE_JOB_BEGIN,DELETE_JOB_SUCCESS,DELETE_JOB_ERROR,EDIT_JOB_BEGIN,EDIT_JOB_SUCCESS,EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,SHOW_STATS_SUCCESS,CLEAR_FILTERS,CHANGE_PAGE

} from './actions'
    import {initialstate} from './globalcontext'


const reducer =(state,action)=>{
    if(action.type===REGISTER_USER_BEGIN){
       
    return {...state,loading:true}
    }
 if(action.type===REGISTER_USER_SUCCESS){
       
    return {...state,loading:false,user:action.payload.newusers,
        location:action.payload.newusers.location,token:action.payload.token,
    joblocation:action.payload.newusers.location,showalert:true,alertText:'register successful'}
}
if(action.type===REGISTER_USER_ERROR){
       
    return {...state,loading:false,showalert:true,alertText:action.payload}
}

if(action.type===LOGIN_USER_BEGIN){
       
    return {...state,loading:true}
    }
 if(action.type===LOGIN_USER_SUCCESS){
       
    return {...state,loading:false,user:action.payload.newusers,
        location:action.payload.newusers.location,token:action.payload.token,
    joblocation:action.payload.newusers.location,showalert:true,alertText:'LOGIN successful'}
}
if(action.type===LOGIN_USER_ERROR){
       
    return {...state,loading:false,showalert:true,alertText:action.payload}
}


if(action.type===UPDATE_USER_BEGIN){
       
    return {...state,loading:true}
    }
 if(action.type===UPDATE_USER_SUCCESS){
       
    return {...state,loading:false,user:action.payload.newusers,
        location:action.payload.newusers.location,token:action.payload.token,
    joblocation:action.payload.newusers.location,showalert:true,alertText:'UPDATE successful'}
}
if(action.type===UPDATE_USER_ERROR){
       
    return {...state,loading:false,showalert:true,alertText:action.payload}
}

    if(action.type==='danger'){
       
        return {...state,alertType:'danger',alertText:'please provide values',showalert:true}
    }

    if(action.type==='reseterror'){
        console.log('reset error called');
        return {...state,showalert:false}
    }
    if(action.type==='togglesidebar'){
        return {...state,sidebar:!state.sidebar}

    }
    if(action.type===LOGIN_OUT_USER){
        return {...initialstate,user:null,token:null,joblocation:'',location:''}

    }
    if(action.type===HANDLE_CHANGE){

        return {...state,[action.payload.name]:action.payload.value,page:1}
    }

    if(action.type===CLEAR_VALUES){
        console.log('clearvalues reducer called')
        const initialstates= {     joblocation:state.location,
            isediting:false,
            editjobid:'',
            position:'',
            company:'',
            jobtype:'full-time',
            status:'pending'}
            

        return {...state,...initialstates}
    }

    if(action.type===CREATE_JOB_BEGIN){
        return {...state,loading:true}
    }
    if(action.type===CREATE_JOB_SUCCESS){
       return {...state, loading:false,
        showalert:true,
        alertText:'NEW JOB CREATED'}
    }

    if(action.type===CREATE_JOB_ERROR){
        return {...state,loading:false,showalert:true,alertText:action.payload.msg}
    }
   


    if(action.type===GET_JOBS_BEGIN){
        return {...state,loading:true,showalert:true,alertText:'fetching your jobs'}
    }
    if(action.type===GET_JOBS_SUCCESS){
       return {...state, loading:false,
        showalert:false,
        jobs:action.payload.alljobs,
        numofpages:action.payload.numofpages,
        totaljobs:action.payload.totaljobs,
        }
    }
    if(action.type===SET_EDIT_JOB){
        const job=state.jobs.find((job)=>job._id===action.payload.id)
        const {_id,position,jobLocation,jobType,status,company,createdAt}=job
        return {...state,isediting:true,editjobid:_id,position,status,jobLocation,jobType,company,
        }
    }

    if(action.type===DELETE_JOB_BEGIN){
        return{...state,loading:true}
    }
    
    if(action.type===EDIT_JOB_BEGIN){
        return{...state,loading:true}
    }
    if(action.type===EDIT_JOB_SUCCESS){
        return {...state, loading:false,
            showalert:false,
            alertText:'Job Updated!'
            }
    }
    if(action.type===EDIT_JOB_ERROR){
        return {...state, loading:false,
            showalert:false,
            alertText:action.payload.msg
            }
    }
    if(action.type===SHOW_STATS_BEGIN){
        return{...state,loading:true,showalert:false}
    }
    if(action.type===SHOW_STATS_SUCCESS){
        return {...state, loading:false,
            
            stats:action.payload.stats,
            monthlyapp:action.payload.monthlyapp

            }
    }
    

     if(action.type===CLEAR_FILTERS){
        return {...state, search:[],
            searchstatus:'all',
            searchtype:'all',
            sort:'latest',
            sortoptions:['latest','oldest','a-z','z-a']}
    }

    if(action.type===CHANGE_PAGE){
        return {...state, page:action.payload.page}
    }

    throw new Error('no such action')
}                                                                                                                                                                                                                                                                                                                                                           




export default reducer