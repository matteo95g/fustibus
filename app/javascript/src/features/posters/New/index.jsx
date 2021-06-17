import React, { useState, useReducer, useEffect } from "react";
import { Box, Button } from "@common/ui";
import createPdf from "@features/posters/utils/createPdf";
import SaveButton from "@common/components/SaveButton";
import PosterForm from "@features/posters/components/PosterForm";
import { reducer } from "@utils/app/forms";
import { currentUserClub } from "@features/users/selectors";
import { useSelector } from "react-redux";
import { update, find } from "@features/posters/postersSlice";
import { useDispatch } from "react-redux";
import { convertFromRaw } from "draft-js";
import { TITLE } from "@app/constants";

const NewPoster = () => {
  const [savingPoster, setSavingPoster] = useState(false);
  const [savingPosterAndPdf, setSavingPosterAndPdf] = useState(false);
  const [loading, setLoading] = useState(false);
  let initialInternalState = {};
  const [editorInternalState, setEditorInternalState] = useReducer(reducer, initialInternalState);
  const club = useSelector((state) => currentUserClub(state));
  const dispatch = useDispatch();

  const handleSave = async () => {
    setSavingPoster(true);
    await dispatch(update(club.id, editorInternalState));
    setSavingPoster(false);
  };

  const handleSaveAndPdf = async () => {
    setSavingPosterAndPdf(true);
    const response = await dispatch(update(club.id, editorInternalState));
    const {
      payload: {
        data: { data },
      },
    } = response;

    createPdf(data);

    setSavingPosterAndPdf(false);
  };

  const fetchPoster = async () => {
    setLoading(true);
    const response = await dispatch(find(club.id));
    const {
      payload: {
        data: { data },
      },
    } = response;
    const { attributes } = data;

    let posterFormated = {};
    Object.keys(attributes).forEach((key) => {
      if (key !== TITLE) posterFormated[key] = JSON.parse(attributes[key]);
      if (posterFormated[key]) posterFormated[key] = convertFromRaw(posterFormated[key]);
    });
    posterFormated[TITLE] = attributes[TITLE];
    setEditorInternalState(posterFormated);
    setLoading(false);
  };

  useEffect(() => {
    fetchPoster();
  }, []);

  return (
    <Box p={10}>
      <PosterForm
        editorInternalState={editorInternalState}
        setEditorInternalState={setEditorInternalState}
        loading={loading}
      />
      <SaveButton mr="4" isLoading={savingPoster} my="6" onClick={handleSave} />
      <Button my="6" isLoading={savingPosterAndPdf} onClick={handleSaveAndPdf}>
        Guardar y exportar PDF
      </Button>
    </Box>
  );
};

export default NewPoster;
