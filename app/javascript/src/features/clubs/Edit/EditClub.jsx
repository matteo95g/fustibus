import React, { useState, useEffect } from "react";
import { create } from "@features/clubs/clubsSlice";
import { Box } from "@common/ui";
import { useDispatch, useSelector } from "react-redux";
import ClubForm from "@features/clubs/components/ClubForm";
import { currentClub } from "@features/clubs/selectors";
import { find, update } from "@features/clubs/clubsSlice";

const Edit = ({ id }) => {
  const dispatch = useDispatch();
  const [clubUpdated, setClubUpdated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cover, setCover] = useState(null);
  const club = useSelector((state) => currentClub(state));

  const handleUpload = (files) => {
    setCover(files[0]);
  };

  useEffect(() => {
    const fetchClub = async () => {
      const response = await dispatch(find(id));
      if (response.payload.status === 404) {
        history.push(clubsUrl());
      }
    };
    fetchClub();
  }, [id]);

  const handleSubmit = (values) => {
    setSubmitting(true);
    if (cover) values.cover = cover;
    dispatch(update(id, values)).then(() => {
      setClubUpdated(true);
      setSubmitting(false);
    });
  };

  return (
    <Box m="6">
      <ClubForm
        club={club}
        handleUpload={handleUpload}
        handleSubmit={handleSubmit}
        submitting={submitting}
        actionCompleted={clubUpdated}
      />
    </Box>
  );
};

export default Edit;
