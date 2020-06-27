import React from "react";
import { Button, Flex } from "@common/ui";
import { useHistory } from "react-router-dom";

const Actions = ({ setIsOpen }) => {
  return (
    <Flex my="6" justify="flex-end">
      <Button rightIcon="plus-square" variantColor="green" onClick={() => setIsOpen(true)}>
        Crear Entrada
      </Button>
    </Flex>
  );
};

export default Actions;
