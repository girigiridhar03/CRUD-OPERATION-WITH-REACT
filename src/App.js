import { ChakraProvider } from '@chakra-ui/react'
import './App.css';
import HeadingButton from './components/HeadingButton';
import ContextProvider, { context } from './context/Context';
import ProductTable from './components/ProductTable';


function App() {


  return (
    <ChakraProvider>
      <ContextProvider>
      <HeadingButton />
      <ProductTable />
    </ContextProvider>
    </ChakraProvider>
  );
}

export default App;
