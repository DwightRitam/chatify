import { Flex, Heading, Avatar } from "@chakra-ui/react"

export default function Topbar({email}) {
  return (
    <Flex
      bg="gray.100"
      h="81px" w="100%"
      align="center"
      p={5}
    >
      <Avatar src="https://media.tenor.com/6BxeLIUk8iAAAAAj/whatsapp-chat.gif" marginEnd={3} />
      <Heading size="lg" className="font-serif text-slate-600">{email}</Heading>


    </Flex>
  )
}