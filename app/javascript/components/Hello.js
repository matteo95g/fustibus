import React from "react";
import { Box, Flex, Input } from "@chakra-ui/core";

const Hello = ({ title }) => (
  <Box>
    <Box p={10} mb={4} bg="green.500" fontSize="2xl" textAlign="center">{title}</Box>
    <Flex justifyContent="center">
      <Input
        w="50%"
        name="name"
        placeholder="name"
      />
    </Flex>
  </Box>
);

export default Hello;
