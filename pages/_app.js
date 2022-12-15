import Login from '../components/Login'
import '../styles/globals.css'
import { Center, ChakraProvider, Spinner } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebasconfig';

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
 if (loading){
  return (
    <ChakraProvider>
     <Center h="100vh">
      <Spinner size="xl"/>
     </Center>
      
    </ChakraProvider>
  )
 }
 if(!user){
  return (
    <ChakraProvider>
     <Login/>
      
    </ChakraProvider>
  )
 }


  return <>
  <ChakraProvider>

  
  <Component {...pageProps} />
  </ChakraProvider>
  
  </>
  
}

export default MyApp
