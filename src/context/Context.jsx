import { createContext, useEffect, useReducer } from "react";

 export const context = createContext();


 const reducer = (state,action) =>{
     switch(action.type){
        case 'TOGGLE':return{
          ...state,toggle:action.payload
        }
        case 'DATA':return{
          ...state,products:[...action.payload]
        }
         
        case 'INPUT_VALUE':return{
           ...state,formDetails:{...state.formDetails,[action.payload.name]:action.payload.value}
        }

        case 'EDIT_ID':return{
          ...state,id:action.payload
        }
        case  'DELETE_ID':return{
           ...state,deleteId:action.payload
        }
        case 'SINGLE_DATA':return{
          ...state,formDetails:action.payload
        }
     
        default : return state
     }
 }

const ContextProvider = ({children}) => {
 
  const [state,dispatch] = useReducer(reducer,{
     toggle:false,
     products:[],
     formDetails :{
      productName:'',
      company:'',
      category:'',
      price:''
     },
     id:'',
     deleteId:''
  })
  useEffect(()=>{
    getSingleData(state.id)
    fetchData();
    deleteProduct(state.deleteId)
  },[state.id,state.deleteId])
 
  const fetchData  = () =>{
    fetch('http://localhost:4000/products')
    .then(res=>res.json())
    .then(data=>(
      dispatch({
        type:'DATA',
        payload:data
      })
    ))
  }


const getSingleData = (id) =>{
  if(id){
    fetch(`http://localhost:4000/products/${id}`,{
      method:'GET',
    })
    .then((res)=>res.json())
    .then(data=>dispatch({
      type:'SINGLE_DATA',
      payload:data
    }))
  }
}


 const deleteProduct = (id) =>{
       if(id){
        fetch(`http://localhost:4000/products/${id}`,{
          method:'DELETE',
        })
        fetchData();
       }
 }
    
 

  return (
   <context.Provider value={{state,dispatch,fetchData,deleteProduct}}>
    {children}
   </context.Provider>
  )
}

export default ContextProvider
