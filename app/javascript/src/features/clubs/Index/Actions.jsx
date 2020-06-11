import React from "react";
import { Button, Flex } from "@common/ui";
import { useHistory } from "react-router-dom";
import { newClubUrl } from "@utils/app/urlHelpers";

const Actions = () => {
  const history = useHistory();
  return (
    <Flex my="6" justify="flex-end">
      <Button rightIcon="plus-square" variantColor="green" onClick={() => history.push(newClubUrl())}>
        Crear
      </Button>
    </Flex>
  );
};

export default Actions;
