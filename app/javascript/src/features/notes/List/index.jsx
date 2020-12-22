import React, { useState, useEffect } from "react";
import { Flex, Text, Box, Icon } from "@common/ui";
import { useHistory } from "react-router-dom";
import NoteSection from "./NoteSection";
import { editNoteUrl } from "@utils/app/urlHelpers";

const SUBSTRACT = "substract";
const INCREMENT = "increment";

const NoteList = ({ notes }) => {
  const notesIncluded = notes?.included ?? [];
  const missions = notesIncluded.filter((inc) => inc.type === "missions");
  const notesSections = notesIncluded.filter((inc) => inc.type === "note_sections");
  const history = useHistory();

  const [index, setIndex] = useState(0);
  const [selectedMission, setSelectedMission] = useState(null);
  const [selectedNotesSections, setSelectedNotesSections] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    setSelectedMission(missions[index]);
  }, [missions]);

  useEffect(() => {
    setSelectedNotesSections(notesSections.filter((section) => section.attributes.missionId == selectedMission.id));
    setSelectedNote(notes?.data?.filter((note) => note.attributes.missionId == selectedMission.id)[0]);
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
    setSelectedNotesSections(notesSections.filter((section) => section.attributes.missionId == selectedMission.id));
    setSelectedNote(notes?.data?.filter((note) => note.attributes.missionId == selectedMission.id)[0]);
  };

  return (
    <>
      {missions.length > 0 && (
        <Flex alignItems="center" justifyContent="space-between" px="200px" my="5">
          <Icon className="cursor-pointer" name="chevron-left" size="40px" onClick={() => handleMissionChange(SUBSTRACT)} />
          <Flex alignItems="center">
            <Text>{missions?.[index]?.attributes?.name || ""}</Text>
            {selectedNote && (
              <Icon name="edit" ml="4" className="cursor-pointer" onClick={() => history.push(editNoteUrl(selectedNote.id))} />
            )}
          </Flex>
          <Icon className="cursor-pointer" name="chevron-right" size="40px" onClick={() => handleMissionChange(INCREMENT)} />
        </Flex>
      )}

      {selectedNotesSections.map((section, i) => {
        return <NoteSection section={section} key={i} />;
      })}
    </>
  );
};

export default NoteList;
