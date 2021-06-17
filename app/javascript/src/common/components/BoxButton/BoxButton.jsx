import React from "react";
import { PseudoBox } from "@common/ui";

const BoxButton = ({ title, onClick }) => {
  return (
    <PseudoBox
      as="button"
      maxW="sm"
      borderWidth="1px"
      rounded="lg"
      mr="4"
      size="150px"
      align="center"
      onClick={onClick}
      _hover={{ bg: "blue.50" }}
      boxShadow="md"
      bg="gray.50"
    >
      {title}
    </PseudoBox>
  );
};

export default BoxButton;
