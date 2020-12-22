import React, { useEffect, useState } from "react";
import { Text } from "@common/ui";
import notesApi from "@features/notes/api";
import NoteSections from "@features/notes/components/NoteSections";
import { notebookUrl } from "@utils/app/urlHelpers";
import { useParams, useHistory } from "react-router-dom";
import { find } from "@features/notes/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { currentNotesSections } from "@features/notes/selectors";
import { TEXT, TEXT_AND_IMAGE, LIST, IMAGE, NOTE_SECTION_STRING_TO_INT } from "@app/constants";
import SaveButton from "@common/components/SaveButton";
import CancelButton from "@common/components/CancelButton";

const EditNote = () => {
  const dispatch = useDispatch();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const noteSections = useSelector((state) => currentNotesSections(state));

  useEffect(() => {
    if (id) {
      dispatch(find(id));
    }
  }, [id]);

  const handleSave = async () => {
    setLoading(true);
    await notesApi.update(id, { sections: sections });
    setLoading(false);
    history.push(notebookUrl());
  };

  useEffect(() => {
    if (noteSections.length > 0) {
      const currentSections = noteSections.map((section) => {
        let payload;
        const type = NOTE_SECTION_STRING_TO_INT[section.attributes.sectionType];

        if (type === LIST) {
          payload = section.attributes.list;
        } else if (type === TEXT_AND_IMAGE) {
          payload = {
            text: section.attributes.text,
            image: section.attributes.url,
          };
        } else if (type === TEXT) {
          payload = section.attributes.text;
        } else if (type === IMAGE) {
          payload = {
            image: section.attributes.url,
          };
        }
        return { sectionType: type, payload: payload };
      });
      setSections(currentSections);
    }
  }, []);

  return (
    <>
      <Text fontSize="5xl" mr="5">
        Editar nota
      </Text>
      <NoteSections setSections={setSections} sections={sections} />
      <SaveButton isLoading={loading} onClick={handleSave} mt="4" />
      <CancelButton onClick={() => history.goBack()} mt="4" ml="2" />
    </>
  );
};

export default EditNote;
