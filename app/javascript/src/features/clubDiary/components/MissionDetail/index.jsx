import React, { useState } from "react";
import { Flex } from "@common/ui";

const MissionDetail = ({ mission }) => {
  const {
    attributes: { name, description },
  } = mission;
  return (
    <Flex flex="1" alignSelf="stretch" ml="4" flexDirection="column" borderColor="black" borderWidth="0.5px">
      <Flex margin="2" padding="4" borderColor="black" borderBottomWidth="0.5px">
        {name}
      </Flex>
      <Flex margin="2">{description}</Flex>
    </Flex>
  );
};

export default MissionDetail;
