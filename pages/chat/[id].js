import { Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'
import React, { useEffect, useRef } from 'react'
import Bottombar from '../../components/Bottombar'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import { useRouter } from "next/router"
import { useCollectionData,useDocumentData } from 'react-firebase-hooks/firestore';
import { collection, doc, orderBy, query } from 'firebase/firestore'
import { auth, db } from '../../firebasconfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import getOtherEmail from '../../utils/getOtheremail'

const id = () => {
  
  const [user] = useAuthState(auth);

  const router= useRouter();
  const {id}=router.query;
  const bottomOfChat=useRef()

  const [chat] = useDocumentData(doc(db, "chats", id));
  const q=query(collection(db,`chats/${id}/messages`),orderBy("timestamp"))
  const [messages] =useCollectionData (q);
 
  const getMessages = () =>
  messages?.map(msg => {
    const sender = msg.sender === user.email;
    return (
      <Flex key={Math.random()} alignSelf={sender ? "flex-start" : "flex-end"} bg={sender ? "blue.100" : "green.100"} w="fit-content" minWidth="100px" borderRadius="lg" p={3} m={1}>
        <Text className='text-black font-serif'>{msg.text}</Text>
      </Flex>
    )
  })


  useEffect(() =>
  {
  setTimeout(
    bottomOfChat.current.scrollIntoView({
    behavior: "smooth",
    block: 'start',
  }), 100)
}
, [messages])
 
  return (
    <>
      <Flex

     
      className='h-[173vh] sm:h-[100vh]'
    >
      <Head><title>Chat App</title></Head>

      <Sidebar />

      <Flex flex={1} className="bg-slate-700" direction="column">
      <Topbar email={getOtherEmail(chat?.users, user)} />

        <Flex flex={1} direction="column" className='font-serif text-white' pt={4} mx={5} overflowX="scroll" >
          {getMessages()}
          <div ref={bottomOfChat}></div>
       
  
        </Flex>


        <Bottombar id={id} user={user}/>
      </Flex>

    </Flex>
    </>
  )
}

export default id