import React from "react";
import { Flex, Text } from "@common/ui";

const MissionDetail = ({ mission }) => {
  const {
    attributes: { name, description },
  } = mission;
  return (
    <Flex flex="1" alignSelf="stretch" ml="4" flexDirection="column">
      <Flex borderColor="black" borderBottomWidth="0.5px">
        <Text mb={2} fontSize="2xl">
          {name}
        </Text>
      </Flex>
      <Flex>
        <Text my={2}>{description}</Text>
      </Flex>
    </Flex>
  );
};

export default MissionDetail;
