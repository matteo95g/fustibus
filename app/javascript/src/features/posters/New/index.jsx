import React, { useState, useReducer } from "react";
import { Box, Button } from "@common/ui";
import createPdf from "@features/posters/utils/createPdf";
import PostersApi from "@features/posters/api";
import CreateButton from "@common/components/CreateButton";
import PosterForm from "@features/posters/components/PosterForm";
import { reducer } from "@utils/app/forms";

const NewPoster = () => {
  const [creatingPoster, setCreatingPoster] = useState(false);
  const [creatingPosterAndPdf, setCreatingPosterAndPdf] = useState(false);
  let initialInternalState = {};
  const [editorInternalState, setEditorInternalState] = useReducer(reducer, initialInternalState);

  const handleCreate = async () => {
    setCreatingPoster(true);
    await PostersApi.create(editorInternalState);
    setCreatingPoster(false);
  };

  const handleCreateAndPdf = async () => {
    setCreatingPosterAndPdf(true);
    const response = await PostersApi.create(editorInternalState);
    const {
      data: { data },
    } = response;

    createPdf(data);

    setCreatingPosterAndPdf(false);
  };

  return (
    <Box>
      <PosterForm editorInternalState={editorInternalState} setEditorInternalState={setEditorInternalState} />
      <CreateButton mr="4" isLoading={creatingPoster} my="6" onClick={handleCreate}>
        Guardar
      </CreateButton>
      <Button my="6" isLoading={creatingPosterAndPdf} onClick={handleCreateAndPdf}>
        Crear y exportar PDF
      </Button>
    </Box>
  );
};

export default NewPoster;
