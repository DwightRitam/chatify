import { Avatar } from "@chakra-ui/avatar";
import { Button, FormControl, Input } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebasconfig";
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, doc, getDoc } from "firebase/firestore";


import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from "firebase/firestore";
import getOtherEmail from "../utils/getOtheremail";
import { useRouter } from "next/router";


export default  function Sidebar() {
    const [user] = useAuthState(auth);
    // console.log(user.email);
    const router = useRouter();
  
    const chatExists = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)))

    const newChat = async () => {
      const input = prompt("Enter email of chat recipient");
      if (!chatExists(input) && (input != user.email)) {
        await addDoc(collection(db, "chats"), { users: [user.email, input] })
      }
    }

  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map(doc => ({id: doc.id, ...doc.data()}));
//   console.log( chats?.filter(chat => chat.users.includes(user.email)));

const redirect = (id) => {
    router.push(`/chat/${id}`);
  }

  
  const chatList = () => {
    return (
      chats?.filter(chat => chat.users.includes(user.email))
      .map(
        chat => 
          <Flex key={Math.random()}  className="sm:p-[10px]  p-[5px]" align="center" _hover={{bg: "gray.100", cursor: "pointer"}} onClick={() => redirect(chat.id)}>
            <img src="https://media.tenor.com/5a7v-p3E5pkAAAAC/discord.gif" className="md:w-[50px] w-[30px] rounded-[30px] bg-slate-400" marginEnd={3} />
            <Text className="sm:ml-[5px] ml-[2px] sm:text-[17px]  text-[10px]">{getOtherEmail(chat.users, user)}</Text>
          </Flex>
      )
    )
  }


    return (

        <Flex
            // bg="blue.100"

            className="md:w-[300px] w-[170px]"
            h="100%"
            borderEnd="1px solid" borderColor="gray.200"
            direction="column"
        >



            <Flex
                bg="red.100"
                h="81px" w="100%"
                align="center" justifyContent="space-between"
                borderBottom="1px solid" borderColor="gray.200"
                p={3}
            >

                <Flex align="center">
                    <Avatar src={user.photoURL} marginEnd={3} className="hidden" />
                    <Text className="md:flex hidden">{user.displayName}</Text>
                </Flex>

                <IconButton size="sm" isRound icon={<ArrowLeftIcon />} onClick={() => signOut(auth)} />

            </Flex>

            <Button m={5} p={4} onClick={() => newChat()}>New Chat</Button>

            <Flex overflowY="scroll" direction="column" flex={1} className="bg-slate-200">
            {chatList()}
         
            </Flex>

        </Flex>

    )
}