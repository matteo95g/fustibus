import React, { useState, useEffect } from "react";
import { Flex, Text, Box, Icon } from "@common/ui";

import NoteSection from "./NoteSection";

const SUBSTRACT = "substract";
const INCREMENT = "increment";

const NoteList = ({ notes }) => {
  const notesIncluded = notes?.included ?? [];
  const missions = notesIncluded.filter((inc) => inc.type === "missions");
  const notesSections = notesIncluded.filter((inc) => inc.type === "note_sections");

  const [index, setIndex] = useState(0);
  const [selectedMission, setSelectedMission] = useState(null);
  const [selectedMissionSections, setSelectedMissionSections] = useState([]);

  useEffect(() => {
    setSelectedMission(missions[index]);
  }, [missions]);

  useEffect(() => {
    setSelectedMissionSections(notesSections.filter((section) => section.attributes.missionId == selectedMission.id));
  }, [selectedMission]);

  const handleMissionChange = (operation) => {
    let newIndex = index;
    if (operation === SUBSTRACT) {
      newIndex -= 1;
      if (newIndex === -1) return;
    } else {
      newIndex += 1;
      if (newIndex === missions.length) return;
    }
    setIndex(newIndex);
    setSelectedMission(missions[newIndex]);
    setSelectedMissionSections(notesSections.filter((section) => section.attributes.missionId == selectedMission.id));
  };

  return (
    <>
      {missions.length > 0 && (
        <Flex alignItems="center" justifyContent="space-between" px="200px" my="5">
          <Icon className="cursor-pointer" name="chevron-left" size="40px" onClick={() => handleMissionChange(SUBSTRACT)} />
          <Text>{missions?.[index]?.attributes?.name || ""}</Text>
          <Icon className="cursor-pointer" name="chevron-right" size="40px" onClick={() => handleMissionChange(INCREMENT)} />
        </Flex>
      )}

      {selectedMissionSections.map((section) => {
        return <NoteSection section={section} />;
      })}
    </>
  );
};

export default NoteList;
