import React, { useState } from "react";
import { Flex } from "@common/ui";

const MissionsList = ({ missions, onSelect }) => {
  const [selected, setSelected] = useState(null);

  const missionSelected = (mission) => {
    if (selected == mission.id) {
      setSelected(null);
    } else {
      setSelected(mission.id);
    }
    onSelect(mission);
  };

  const getBorderColor = (id) => {
    return selected == id ? "black" : "gray";
  };

  return (
    <Flex flex="1" flexDirection="column">
      {missions.map((mission) => {
        const {
          id,
          attributes: { name },
        } = mission;
        return (
          <Flex key={mission.id} borderColor={getBorderColor(id)} borderWidth="0.5px">
            <Flex
              flex="1"
              padding="4"
              borderRightWidth="0.5px"
              borderColor={getBorderColor(id)}
              onClick={() => missionSelected(mission)}
            >
              {name}
            </Flex>
            {/* TODO Seleccionar la mision como activa */}
            <Flex width="10%" justifyContent="center" alignItems="center">
              Activar
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default MissionsList;
