import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import Navbar from "./Navbar";
import { Box as Container } from "@common/ui";
import { loginUrl } from "@utils/app/urlHelpers";

import { currentUser } from "@features/users/selectors";

const Authenticated = ({ children }) => {
  const history = useHistory();
  const user = useSelector(currentUser);

  useEffect(() => {
    if (!user) {
      history.push(loginUrl());
    }
  }, [user]);

  return (
    <React.Fragment>
      <Navbar />
      <Container px={{ xs: 5, md: 10, xl: 20 }}>{children}</Container>
    </React.Fragment>
  );
};

Authenticated.propTypes = {
  children: PropTypes.node,
};
export default Authenticated;
