import React, { useState, useEffect } from "react";
import { Flex, Text, Icon, Box } from "@common/ui";
import Note from "./Note";
import { node } from "prop-types";

const SUBSTRACT = "substract";
const INCREMENT = "increment";

const NoteList = ({ notes }) => {
  const notesIncluded = notes?.included ?? [];
  const missions = notesIncluded.filter((inc) => inc.type === "missions");
  const notesSections = notesIncluded.filter((inc) => inc.type === "note_sections");

  const [index, setIndex] = useState(0);
  const [selectedMission, setSelectedMission] = useState(null);
  const [selectedNotes, setSelectedNotes] = useState([]);

  useEffect(() => {
    setSelectedMission(missions[index]);
  }, [missions]);

  useEffect(() => {
    setSelectedNotes(notes?.data?.filter((note) => note.attributes.missionId == selectedMission.id) || []);
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
  };

  return (
    <>
      {missions.length > 0 && (
        <>
          <Flex alignItems="center" justifyContent="space-between" px="200px" my="5">
            <Icon
              className={index === 0 ? "" : "cursor-pointer"}
              name="chevron-left"
              size="40px"
              opacity={index === 0 ? "0.5" : 1}
              onClick={() => handleMissionChange(SUBSTRACT)}
            />
            <Flex alignItems="center">
              <Text>{missions?.[index]?.attributes?.name || ""}</Text>
            </Flex>
            <Icon
              className={index === missions.length - 1 ? "" : "cursor-pointer"}
              name="chevron-right"
              size="40px"
              opacity={index === missions.length - 1 ? "0.5" : 1}
              onClick={() => handleMissionChange(INCREMENT)}
            />
          </Flex>
          <Box>
            {selectedNotes.map((note) => (
              <Note key={note.id} note={note} notesSections={notesSections} />
            ))}
          </Box>
        </>
      )}
    </>
  );
};

export default NoteList;
