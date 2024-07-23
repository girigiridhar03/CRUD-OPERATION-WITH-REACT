import { Box, Button, HStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import Form from './Form';
import { context } from '../context/Context';

const HeadingButton = () => {


   const {state,dispatch} = useContext(context);


   
   
    const handleClick = () =>{
      
      if(state.toggle){
        dispatch({
          type:'TOGGLE',
          payload:false
        })
      }
      else{
        dispatch({
          type:'TOGGLE',
          payload:true
        })
      }
  }




  return (
    <HStack mt={'5rem'} w={['90%']} maxW={['1000px']} mx={'auto'} justifyContent={'space-between'}>
     {state.toggle&& <Form  />} 
       
        <Box fontSize={['2rem']} fontWeight={'bold'} color={'orange'}>
             Admin Panel
        </Box>
        <Box>
             <Button colorScheme='orange' onClick={handleClick} >Add Product</Button>
        </Box>
    </HStack>
  )
}

export default HeadingButton
