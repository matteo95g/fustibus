import React from "react";
import { Flex, PseudoBox, Switch } from "@common/ui";
import { updateMission } from "@features/clubDiary/clubDiarySlice";
import { currentUser } from "@features/users/selectors";
import { useDispatch, useSelector } from "react-redux";

const MissionsList = ({ missions, onSelect, selectedId }) => {
  const dispatch = useDispatch();
  const {
    attributes: { isCounselor },
  } = useSelector(currentUser);

  const missionSelected = (mission) => {
    onSelect(mission);
  };

  const getBorderColor = (id) => {
    return selectedId == id ? "blue.300" : "gray";
  };

  const getBgColor = (id) => {
    return selectedId == id ? "blue.100" : "gray";
  };

  return (
    <>
      <Flex flex="1" flexDirection="column">
        <Flex>
          <Flex p="2" width="80%">
            Nombre
          </Flex>
          {isCounselor && (
            <Flex width="20%" justifyContent="center" alignItems="center" p="2" width="20%">
              Activa
            </Flex>
          )}
        </Flex>
        {missions.map((mission) => {
          const {
            id,
            attributes: { name, enabled },
          } = mission;

          return (
            <PseudoBox
              onClick={() => missionSelected(mission)}
              key={id}
              className="cursor-pointer"
              bg={getBgColor(id)}
              _hover={{ bg: "blue.100" }}
            >
              <Flex>
                <Flex flex="1" padding="4" borderLeftWidth="4px" borderColor={getBorderColor(id)}>
                  {name}
                </Flex>
                {isCounselor && (
                  <Flex width="20%" justifyContent="center" alignItems="center">
                    <Switch
                      id="email-alerts"
                      isChecked={enabled}
                      onChange={() => dispatch(updateMission(id, { enabled: !enabled }))}
                    />
                  </Flex>
                )}
              </Flex>
            </PseudoBox>
          );
        })}
      </Flex>
    </>
  );
};

export default MissionsList;
