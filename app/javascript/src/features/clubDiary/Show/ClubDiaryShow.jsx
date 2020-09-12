import React, { useEffect, useState } from "react";
import { listMissions } from "@features/clubDiary/clubDiarySlice";
import { missionsState } from "@features/clubDiary/selectors";
import { Text, Skeleton, Flex, Stack } from "@common/ui";
import { useDispatch, useSelector } from "react-redux";
import MissionsList from "@features/clubDiary/components/MissionsList";
import MissionDetail from "@features/clubDiary/components/MissionDetail";

const ClubDiaryShow = () => {
  const missions = useSelector((state) => missionsState(state));
  const dispatch = useDispatch();
  const isLoaded = true;
  const [selected, setSelected] = useState("misiones");
  const [selectedMission, setMission] = useState(null);

  const toggle = (selected) => {
    setSelected(selected);
  };

  useEffect(() => {
    if (selected == "misiones") {
      dispatch(listMissions(1));
    }
  }, [selected]);

  const onMissionSelected = (mission) => {
    if (selectedMission && mission.id == selectedMission.id) {
      setMission(null);
    } else {
      setMission(mission);
    }
  };

  return (
    <>
      <Flex align="center">
        <Text fontSize="5xl" mr="5">
          Diario de Viaje
        </Text>
      </Flex>
      <Stack mt="4" isInline spacing={8} align="center">
        <Flex
          as="button"
          padding="20px"
          borderColor={selected == "misiones" ? "black" : "white"}
          borderWidth="1px"
          onClick={() => toggle("misiones")}
        >
          Misiones
        </Flex>
        <Flex
          as="button"
          padding="20px"
          borderColor={selected == "logros" ? "black" : "white"}
          borderWidth="1px"
          onClick={() => toggle("logros")}
        >
          Logros
        </Flex>
      </Stack>
      <Skeleton isLoaded={isLoaded}>
        <Flex mt="4">
          <MissionsList missions={missions} onSelect={onMissionSelected} />
          {selectedMission && <MissionDetail mission={selectedMission} />}
          {!selectedMission && (
            <Flex flex="1" ml="4">
              Selecciona una misión para ver en detalle.
            </Flex>
          )}
        </Flex>
      </Skeleton>
    </>
  );
};

export default ClubDiaryShow;
