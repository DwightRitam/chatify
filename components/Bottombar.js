import { FormControl, Input, Button } from "@chakra-ui/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebasconfig";


export default function Bottombar({id,user}) {
  const [input, setInput] = useState("")

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp()
    })
    setInput("");
  }
  return (
    <FormControl
      p={3}
      onSubmit={sendMessage}
      as="form"
      className="flex p-3"
    >
      <Input placeholder="Type a message..."  className="w-[50%] pr-5 text-white font-serif" onChange={e => setInput(e.target.value)} value={input} autoComplete="off"  />
      <Button type="submit" className="ml-3 ">Submit</Button>
    </FormControl>
  )
}