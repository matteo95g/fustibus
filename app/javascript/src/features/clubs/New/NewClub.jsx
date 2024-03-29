import React, { useState } from "react";
import { create } from "@features/clubs/clubsSlice";
import { Box } from "@common/ui";
import { useDispatch } from "react-redux";
import ClubForm from "@features/clubs/components/ClubForm";
import { fetchUser } from "@features/users/usersSlice";
import { useHistory } from "react-router-dom";
import { clubsUrl } from "@utils/app/urlHelpers";

const NewClub = () => {
  const dispatch = useDispatch();
  const [clubCreated, setClubCreated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cover, setCover] = useState(null);
  const history = useHistory();

  const handleUpload = (files) => {
    setCover(files[0]);
  };

  const handleSubmit = (values) => {
    setSubmitting(true);
    if (cover) values.cover = cover;
    dispatch(create(values)).then(() => {
      setClubCreated(true);
      setSubmitting(false);
      dispatch(fetchUser());
      history.push(clubsUrl());
    });
  };

  return (
    <Box m="6">
      <ClubForm handleUpload={handleUpload} handleSubmit={handleSubmit} submitting={submitting} actionCompleted={clubCreated} />
    </Box>
  );
};

export default NewClub;
