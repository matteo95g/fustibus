import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import Navbar from "./Navbar";
import { Box as Container } from "@common/ui";
import { loginUrl } from "@utils/app/urlHelpers";

const Authenticated = ({ children }) => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.users.current.user);

  useEffect(() => {
    if (!currentUser) {
      history.push(loginUrl());
    }
  }, [currentUser]);

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
