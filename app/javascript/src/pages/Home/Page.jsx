import React from "react";
import { Box, Flex, Input } from "@common/ui";

const Home = () => (
  <Box p={10} mb={4} bg="green.500" fontSize="2xl" textAlign="center">
    Bienvenido de nuevo!
    <Flex justifyContent="center">
      <Input w="50%" name="name" placeholder="name" />
    </Flex>
  </Box>
);

export default Home;
