import React, { useState } from "react";
import PropTypes from "prop-types";
import UserForm from "@features/users/components/UserForm";
import { currentUser } from "@features/users/selectors";
import { update } from "@features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@features/users/usersSlice";

const Profile = ({}) => {
  const user = useSelector(currentUser);
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleUpload = (files) => {
    setProfileImage(files[0]);
  };

  const handleSubmit = (values) => {
    setSubmitting(true);
    if (profileImage) values.profileImage = profileImage;
    dispatch(update(user.id, values)).then(() => {
      dispatch(fetchUser()).then(() => {
        setSubmitting(false);
        setSuccess(true);
        window.scrollTo(0, 0);
      });
    });
  };

  return (
    <UserForm
      user={user}
      handleSubmit={handleSubmit}
      submitting={submitting}
      handleUpload={handleUpload}
      success={success}
    />
  );
};

export default Profile;

Profile.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
