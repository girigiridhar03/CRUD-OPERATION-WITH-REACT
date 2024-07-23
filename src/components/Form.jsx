import { Box, Button, Input, Select, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { context } from "../context/Context";

const Form = () => {


  const { state, dispatch,fetchData } = useContext(context);

  const handleClick = () => {
    if (state.toggle) {
      dispatch({
        type: "TOGGLE",
        payload: false,
      });
    } else {
      dispatch({
        type: "TOGGLE",
        payload: true,
      });
    }
  };
  
  const handleOnChange = (e) =>{

    const {name,value} = e.target

    dispatch({
      type:'INPUT_VALUE',
      payload:{
        name,
        value
      }
    })

     
  }

 const handleOnSubmit = (e)=>{
  e.preventDefault();

  const {productName,company,category,price} = state.formDetails;

  if(!productName && !company && !category && !price){
    console.log('empty')
  }
  else{

      fetch(`http://localhost:4000/products`,{
        method:'POST',
        body:JSON.stringify(state.formDetails),
        headers:{
           'Content-Type':'application/json'
        }
      })
      
      fetchData();
  }
 }
 const handleUpdate = (e) =>{
   e.preventDefault();

    if(state.id){
      fetch(`http://localhost:4000/products/${state.id}`,{
        method:'PUT',
        body:JSON.stringify(state.formDetails),
        headers:{
           'Content-Type':'application/json'
        }
      })
          
      fetchData();
  }

 }
 


  return (
    <>
      {state.toggle && (
        <Box
          bgColor={"rgb(0,0,0,0.40)"}
          w={"100%"}
          h={"100vh"}
          position={"fixed"}
          top={"0"}
          left={"0"}
          zIndex={"9999"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box bgColor={"white"} p={"2.5rem"} w={"600px"} borderRadius={"10px"}>
            <form >
              <VStack w={"100%"} gap={"2rem"}>
                <VStack alignItems={"flex-start"} w={"100%"} gap={"1rem"}>
                  <Box
                    fontSize={"1.2rem"}
                    fontWeight={"500"}
                    color={"rgb(0,0,0,0.50)"}
                  >
                    Product Name :
                  </Box>
                  <Input
                    type="text"
                    variant={"outline"}
                    colorScheme="orange"
                    name="productName"
                    value={state.formDetails.productName}
                    onChange={handleOnChange}
                  />
                </VStack>

                <VStack alignItems={"flex-start"} w={"100%"} gap={"1rem"}>
                  <Box
                    fontSize={"1.2rem"}
                    fontWeight={"500"}
                    color={"rgb(0,0,0,0.50)"}
                  >
                    Company :
                  </Box>
                  <Input
                    type="text"
                    variant={"outline"}
                    colorScheme="orange"
                    name="company"
                    value={state.formDetails.company}
                    onChange={handleOnChange}
                  />
                </VStack>

                <VStack alignItems={"flex-start"} w={"100%"} gap={"1rem"}>
                  <Box
                    fontSize={"1.2rem"}
                    fontWeight={"500"}
                    color={"rgb(0,0,0,0.50)"}
                  >
                    Category :
                  </Box>
                  <Select
                    placeholder="Select Category"
                    name="category"
                    value={state.formDetails.category}
                    onChange={handleOnChange}
                  >
                    <option>Mobile</option>
                    <option>Laptop</option>
                    <option>Monitor</option>
                    <option>Televison</option>
                    <option>Ac</option>
                  </Select>
                </VStack>

                <VStack alignItems={"flex-start"} w={"100%"} gap={"1rem"}>
                  <Box
                    fontSize={"1.2rem"}
                    fontWeight={"500"}
                    color={"rgb(0,0,0,0.50)"}
                  >
                    Product Price :
                  </Box>
                  <Input
                    type="number"
                    variant={"outline"}
                    colorScheme="orange"
                    name="price"
                    value={state.formDetails.price}
                    onChange={handleOnChange}
                  />
                </VStack>

                <VStack flexDirection={"row"} gap={"2rem"}>
                 
                 {
                  state.id ?  <Button onClick={handleUpdate} type="submit" px={"2.5rem"} colorScheme="green">
                   Updata
                </Button> :  <Button onClick={handleOnSubmit} type="submit" px={"2.5rem"} colorScheme="green">
                Add
                  </Button>
                 }

                  <Button onClick={handleClick} px={"2.5rem"} colorScheme="red">
                    Close
                  </Button>
                </VStack>

              
              </VStack>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Form;
