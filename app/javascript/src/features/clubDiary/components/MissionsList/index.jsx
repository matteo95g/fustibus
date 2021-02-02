import React from "react";
import {
  Flex,
  PseudoBox,
  Icon,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Switch,
} from "@common/ui";
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

  const getBorderColor = (mission) => {
    if (selectedId == mission.id) {
      return "blue.300";
    }

    switch (mission.attributes.status) {
      case "pending":
        return "gray.100";
      case "in_progress":
        return "yellow.100";
      case "completed":
        return "green.100";
    }
  };

  const getBgColor = (mission) => {
    if (selectedId == mission.id) {
      return "blue.100";
    }

    switch (mission.attributes.status) {
      case "pending":
        return "gray.50";
      case "in_progress":
        return "yellow.50";
      case "completed":
        return "green.50";
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "in_progress":
        return "En progreso";
      case "completed":
        return "Completada";
    }
  };

  return (
    <>
      <Flex flex="1" flexDirection="column" mb="20">
        <Flex>
          <Flex p="2" width="50%">
            Nombre
          </Flex>
          <Flex p="2" width="25%" justifyContent="flex-end">
            Trofeo
          </Flex>
          <Flex width="25%" justifyContent="center" alignItems="center" p="2" width="20%">
            Estado
          </Flex>
        </Flex>
        {missions.map((mission) => {
          const {
            id,
            attributes: { name, status, thropy },
          } = mission;

          return (
            <PseudoBox
              onClick={() => missionSelected(mission)}
              key={id}
              className="cursor-pointer"
              bg={getBgColor(mission)}
              _hover={{ bg: "blue.100" }}
              p="3"
              borderLeftWidth="4px"
              borderBottomWidth="1px"
              borderColor={getBorderColor(mission)}
            >
              <Flex>
                <Flex flex="1" padding="4">
                  {name}
                </Flex>
                <ReactSVG
                  src={thropy || ""}
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 50px; height: 50px");
                  }}
                />
                <Flex width="25%" justifyContent="center" alignItems="center">
                  {getStatus(status)}
                  {isCounselor && (
                    <Popover placement="right">
                      <PopoverTrigger>
                        <Icon
                          name="chevron-right"
                          ml="1"
                          size="20px"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </PopoverTrigger>
                      <PopoverContent zIndex={4} w="200px">
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Flex>
                            <Box mr={2} w="100px">
                              Pendiente
                            </Box>
                            <Switch
                              isChecked={status === "pending"}
                              onChange={() => dispatch(updateMission(id, { status: "pending" }))}
                            />
                          </Flex>
                          <Flex>
                            <Box mr={2} w="100px">
                              En progreso
                            </Box>
                            <Switch
                              isChecked={status === "in_progress"}
                              onChange={() =>
                                dispatch(updateMission(id, { status: "in_progress" }))
                              }
                            />
                          </Flex>
                          <Flex>
                            <Box mr={2} w="100px">
                              Completada
                            </Box>
                            <Switch
                              isChecked={status === "completed"}
                              onChange={() => dispatch(updateMission(id, { status: "completed" }))}
                            />
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  )}
                </Flex>
              </Flex>
            </PseudoBox>
          );
        })}
      </Flex>
    </>
  );
};

export default MissionsList;
