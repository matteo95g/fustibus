import React from "react";
import { Flex, PseudoBox, Switch } from "@common/ui";
import { updateMission } from "@features/clubDiary/clubDiarySlice";
import { currentUser } from "@features/users/selectors";
import { useDispatch, useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

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
      <Flex flex="1" flexDirection="column" mb="20">
        <Flex>
          <Flex p="2" width="50%">
            Nombre
          </Flex>
          <Flex p="2" width="30%" justifyContent="flex-end">
            Trofeo
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
            attributes: { name, enabled, thropy },
          } = mission;

          return (
            <PseudoBox
              onClick={() => missionSelected(mission)}
              key={id}
              className="cursor-pointer"
              bg={getBgColor(id)}
              _hover={{ bg: "blue.100" }}
              p="3"
              borderLeftWidth="4px"
              borderColor={getBorderColor(id)}
            >
              <Flex>
                <Flex flex="1" padding="4">
                  {name}
                </Flex>
                <ReactSVG
                  src={thropy}
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 50px; height: 50px");
                  }}
                />
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
