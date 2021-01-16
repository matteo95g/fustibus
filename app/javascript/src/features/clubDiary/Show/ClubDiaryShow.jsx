import React, { useEffect, useState } from "react";

import { listMissions } from "@features/clubDiary/clubDiarySlice";
import { Text, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid } from "@common/ui";
import { useDispatch } from "react-redux";
import MissionsPanel from "@features/clubDiary/components/MissionsPanel";
import { ReactSVG } from "react-svg";

import throphies from "@features/throphies";

const Throphies = () => (
  <SimpleGrid columns={4} spacing="40px" mt="6">
    {throphies.map((thropy, index) => (
      <Flex key={index} justify="center">
        <ReactSVG
          src={thropy}
          key={index}
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width: 150px; height: 150px");
          }}
        />
      </Flex>
    ))}
  </SimpleGrid>
);

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
    <>
      <Flex align="center">
        <Text fontSize="5xl" mr="5">
          Diario de Viaje
        </Text>
      </Flex>

      <Tabs onChange={(index) => setSelected(index)}>
        <TabList>
          <Tab>Misiones</Tab>
          <Tab>Trofeos</Tab>
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
    </>
  );
};

export default ClubDiaryShow;
