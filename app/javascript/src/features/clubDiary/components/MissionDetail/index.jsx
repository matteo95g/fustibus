import React from "react";
import { Flex, Text } from "@common/ui";
import { ReactSVG } from "react-svg";

const MissionDetail = ({ mission }) => {
  const {
    attributes: { name, description, thropy },
  } = mission;
  return (
    <Flex flex="1" alignSelf="stretch" ml="4" flexDirection="column">
      <Flex borderColor="black" borderBottomWidth="0.5px" align="center">
        <ReactSVG
          src={thropy || ""}
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width: 50px; height: 50px; margin-bottom: 5px");
          }}
        />
        <Text fontSize="2xl" ml="2">
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
