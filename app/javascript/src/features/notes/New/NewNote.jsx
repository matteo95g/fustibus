import React, { useEffect, useState } from "react";
import { Text, Select } from "@common/ui";
import missionsApi from "@features/missions/api";
import notesApi from "@features/notes/api";
import CreateButton from "@common/components/CreateButton";
import NoteSections from "@features/notes/components/NoteSections";
import { notebookUrl } from "@utils/app/urlHelpers";
import { useHistory } from "react-router-dom";

const NewNote = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [missions, setMissions] = useState([]);
  const [selectedMissionId, setSelectedMissionId] = useState(null);

  useEffect(() => {
    async function anyNameFunction() {
      const clubMissions = await missionsApi.list({ enabled: true, withoutNotes: true });
      setMissions(clubMissions.data.data);
    }
    anyNameFunction();
  }, []);

  const handleAddNote = async () => {
    setLoading(true);
    const values = {
      selectedMissionId,
      sections,
    };

    await notesApi.create(values);
    setLoading(false);
    history.push(notebookUrl());
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
      {selectedMissionId && (
        <>
          <NoteSections setSections={setSections} sections={sections} />
          <CreateButton my="5" onClick={handleAddNote} isLoading={loading} />
        </>
      )}
    </>
  );
};

export default NewNote;
