import React from "react";
import PropTypes from "prop-types";
import Navbar from "./navbars/Navbar";
import { Box as Container } from "@common/ui";

const Authenticated = ({ children }) => {
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
