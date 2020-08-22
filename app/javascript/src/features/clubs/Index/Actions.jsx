import React from "react";
import { Flex } from "@common/ui";
import { useHistory } from "react-router-dom";
import { newClubUrl } from "@utils/app/urlHelpers";
import CreateButton from "@common/components/CreateButton";

const Actions = () => {
  const history = useHistory();
  return (
    <Flex my="6" justify="flex-end">
      <CreateButton onClick={() => history.push(newClubUrl())} />
    </Flex>
  );
};

export default Actions;
