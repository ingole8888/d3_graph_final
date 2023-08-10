import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Navbar = () => {
  return (
    <Box style={{ width: "100%", height: "4rem", backgroundColor: "teal", display: "flex" }}>
      <Text
        style={{ padding: "0.5rem", color: "white", fontSize: "2rem", fontWeight: "bold",margin:"auto" }}
      >
        Welcome to my Graphs
      </Text>
    </Box>
  )
}

export default Navbar