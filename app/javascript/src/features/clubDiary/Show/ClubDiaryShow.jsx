import React, { useEffect, useState } from "react";

import { listMissions } from "@features/clubDiary/clubDiarySlice";
import { Text, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Box } from "@common/ui";
import { useDispatch, useSelector } from "react-redux";
import MissionsPanel from "@features/clubDiary/components/MissionsPanel";
import { ReactSVG } from "react-svg";
import { missionsState } from "@features/clubDiary/selectors";
import throphies from "@features/throphies";

const Throphies = () => {
  const missions = useSelector((state) => missionsState(state));
  const missionsWithTrhopy = missions.filter(
    (mission) => mission.attributes.status === "completed"
  );
  const throphiesWon = missionsWithTrhopy
    .map((mission) => mission.attributes.thropy)
    .filter(Boolean);

  return (
    <SimpleGrid columns={4} spacing="40px" mt="6">
      {throphies.map(
        (thropy, index) =>
          throphiesWon.includes(thropy) && (
            <Flex key={index} justify="center">
              <ReactSVG
                src={thropy}
                key={index}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 150px; height: 150px");
                }}
              />
            </Flex>
          )
      )}
    </SimpleGrid>
  );
};

const ClubDiaryShow = () => {
  const MISSIONS = 0;

  const dispatch = useDispatch();
  const [selected, setSelected] = useState(MISSIONS);

  // Show Missions

  useEffect(() => {
    if (selected == MISSIONS) {
      dispatch(listMissions());
    }
  }, [selected]);

  return (
    <Box p={10}>
      <Text fontSize="5xl" mr="5">
        Diario de Viaje
      </Text>
      <Tabs onChange={(index) => setSelected(index)}>
        <TabList>
          <Tab>Misiones</Tab>
          <Tab>Mis trofeos</Tab>
        </TabList>
        <TabPanels mt="5">
          <TabPanel>
            <MissionsPanel />
          </TabPanel>
          <TabPanel>
            <Throphies />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ClubDiaryShow;
