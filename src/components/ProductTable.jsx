import { Box, Button, HStack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useContext } from 'react'
import { context } from '../context/Context'
import Form from './Form';
const ProductTable = () => {

  const {state,dispatch,fetchData,deleteProduct} = useContext(context);
  

  const handleEdit = (id) =>{
      if(id){
        dispatch({
          type:'TOGGLE',
          payload:true
        })
        dispatch({
          type:'EDIT_ID',
          payload:id
        })

        fetchData();
      }
  }
 
  const handleDelete = (id) =>{
     if(id){
      dispatch({
        type:'DELETE_ID',
        payload:id
      })
      deleteProduct();
      fetchData()
     }
  }


  return (
   <>
   {state.toggle && <Form />}
    <Box mt={'5rem'} w={['90%']} maxW={['1000px']} mx={'auto'} justifyContent={'space-between'}>
     <TableContainer>
         <Table variant={'simple'}>

          <Thead>
               <Tr>
                   <Th p={'1rem'} fontSize={'1.1rem'}>Product Name</Th>
                   <Th p={'1rem'} fontSize={'1.1rem'}>Company</Th>
                   <Th p={'1rem'} fontSize={'1.1rem'}>Category</Th>
                   <Th p={'1rem'} fontSize={'1.1rem'}>Price</Th>
               </Tr>
          </Thead>
             
             <Tbody>
                    {state.products.map((product,index)=>(
                       <Tr key={index}>
                           <Td>{product.productName}</Td>
                           <Td>{product.company}</Td>
                           <Td>{product.category}</Td>
                           <Td>{product.price}</Td>
                           <Td>
                            <HStack>
                             <Button colorScheme='green' onClick={()=>handleEdit(product.id)}>Edit</Button>
                             <Button colorScheme='red' onClick={()=>handleDelete(product.id)}>Delete</Button>
                            </HStack>
                           </Td>
                       </Tr>
                    ))}
             </Tbody>
           


         </Table>
     </TableContainer>
    </Box>
   </>
  )
}

export default ProductTable
