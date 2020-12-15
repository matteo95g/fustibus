import React, { useEffect, useState } from "react";

import { listMissions } from "@features/clubDiary/clubDiarySlice";
import { Text, Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from "@common/ui";
import { useDispatch } from "react-redux";
import MissionsPanel from "@features/clubDiary/components/MissionsPanel";

const ClubDiaryShow = () => {
  const MISSIONS = 0;
  const ACHIEVEMENTS = 1;

  const dispatch = useDispatch();
  const [selected, setSelected] = useState(MISSIONS);

  // Show Missions

  useEffect(() => {
    if (selected == MISSIONS) {
      dispatch(listMissions());
    } else if (selected == ACHIEVEMENTS) {
      // Todo: dispatch list de logros
    }
  }, [selected]);

  return (
    <>
      <Flex align="center">
        <Text fontSize="5xl" mr="5">
          Diario de Viaje
        </Text>
      </Flex>

      <Tabs onChange={(index) => setSelected(index)}>
        <TabList>
          <Tab>Misiones</Tab>
          <Tab>Logros</Tab>
        </TabList>
        <TabPanels mt="5">
          <TabPanel>
            <MissionsPanel />
          </TabPanel>
          <TabPanel>TODO :)</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ClubDiaryShow;
