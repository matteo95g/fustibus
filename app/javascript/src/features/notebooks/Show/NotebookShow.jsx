import React, { useEffect, useState } from "react";
import { Flex, Text } from "@common/ui";
import { useHistory } from "react-router-dom";
import { newNoteUrl } from "@utils/app/urlHelpers";
import CreateButton from "@common/components/CreateButton";
import notesApi from "@features/notes/api";
import List from "@features/notes/List";

const NoteBookList = () => {
  const history = useHistory();
  const [userNotes, setUserNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await notesApi.list();
      setUserNotes(notes.data);
    };

    fetchNotes();
  }, []);

  return (
    <>
      <Flex align="center" justify="space-between">
        <Text fontSize="5xl" mr="5">
          Libreta de apuntes
        </Text>
        <CreateButton label="Crear nota" onClick={() => history.push(newNoteUrl())} />
      </Flex>
      <List notes={userNotes} />
    </>
  );
};

export default NoteBookList;
