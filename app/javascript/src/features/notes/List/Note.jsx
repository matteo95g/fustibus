import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import notesApi from "@features/notes/api";
import { Flex, Icon, Box } from "@common/ui";
import { editNoteUrl } from "@utils/app/urlHelpers";
import ConfirmDeleteModal from "@common/components/ConfirmDeleteModal";
import NoteSection from "./NoteSection";

const Note = ({ note, notesSections }) => {
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const sections = notesSections.filter((section) => section.attributes.noteId == note.id);

  const onDeleteConfirm = async () => {
    await notesApi.destroy(note.id);
    location.reload();
  };

  return (
    <Box p={6} rounded="md" bg="gray.100" mb={4}>
      <Flex justifyContent="space-between" alignItems="center" borderBottom="1px" borderColor="gray.400" pb={3}>
        <Box>{note.attributes.owner || "Mi Nota"}</Box>
        <Box>
          <Icon
            name="edit"
            ml="4"
            className="cursor-pointer"
            onClick={() => history.push(editNoteUrl(note.id), { note, sections })}
          />
          <Icon name="delete" ml="4" className="cursor-pointer" onClick={() => setShowDeleteModal(true)} />
        </Box>
      </Flex>
      {sections.map((section, i) => {
        return <NoteSection section={section} key={i} />;
      })}
      <ConfirmDeleteModal
        header={"¿Seguro que quieres borrar la nota?"}
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        onDeleteConfirm={onDeleteConfirm}
      />
    </Box>
  );
};

export default Note;
