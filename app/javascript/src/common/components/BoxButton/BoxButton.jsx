import React from "react";
import { Box } from "@common/ui";

const BoxButton = ({ title, onClick }) => {
  return (
    <Box as="button" maxW="sm" borderWidth="1px" rounded="lg" mr="4" size="150px" align="center" onClick={onClick}>
      {title}
    </Box>
  );
};

export default BoxButton;
