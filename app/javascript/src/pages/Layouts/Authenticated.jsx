import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbars/Navbar";

const Authenticated = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
};

Authenticated.propTypes = {
  children: PropTypes.node,
};
export default Authenticated;
