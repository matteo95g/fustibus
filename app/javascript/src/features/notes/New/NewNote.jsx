import React, { useEffect, useState } from "react";
import { Text, Select } from "@common/ui";
import missionsApi from "@features/missions/api";
import notesApi from "@features/notes/api";
import CreateButton from "@common/components/CreateButton";
import NoteSections from "./NoteSections";

const NewNote = () => {
  const [sections, setSections] = useState([]);

  const [missions, setMissions] = useState([]);
  const [selectedMissionId, setSelectedMissionId] = useState(null);

  useEffect(() => {
    async function anyNameFunction() {
      const clubMissions = await missionsApi.list();
      setMissions(clubMissions.data.data);
    }
    anyNameFunction();
  }, []);

  const handleAddNote = async () => {
    const values = {
      selectedMissionId,
      sections,
    };

    await notesApi.create(values);
  };

  return (
    <>
      <Text fontSize="5xl" mr="5">
        Nueva nota
      </Text>
      <Select placeholder="Selecciona una misión" my="5" onChange={(e) => setSelectedMissionId(e.target.value)}>
        {missions?.map((mission) => (
          <option key={mission.id} value={mission.id}>
            {mission.attributes.name}
          </option>
        ))}
      </Select>
      <NoteSections setSections={setSections} sections={sections} />
      <CreateButton my="5" onClick={handleAddNote} />
    </>
  );
};

export default NewNote;
