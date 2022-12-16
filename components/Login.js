import Head from "next/head";
import { ChatIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Stack } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebasconfig";

export default function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <>
    
      <Head>
        <title>Login</title>
      </Head>

      <Center className="bg-slate-400 shadow-md" h="100vh">

        <Stack 
        className="shadow-xl border bg-gray-400"

          align="center"
        
          p={16}
          rounded="3xl"
          spacing={12}
          boxShadow="lg"
        >
          
          <Box
            className="bg-slate-500"
            w="fit-content"
            p={5}
            rounded="3xl"
            boxShadow="md"
          >
            {/* <ChatIcon w="100px" h="100px" color="white" />
             */}
             <img src="https://media.tenor.com/UM0BxP30H40AAAAj/chat-speech-bubble.gif" className="w-[50%] m-auto h-[130px]"  alt=""/>
          </Box>

          <Button boxShadow="md" onClick={()=>signInWithGoogle("",{prompt:"select_account"})}>Sign In with Google</Button>

        </Stack>

      </Center>
    
    </>
  )
}