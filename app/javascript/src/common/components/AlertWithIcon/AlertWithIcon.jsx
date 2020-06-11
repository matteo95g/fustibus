import React from "react";
import { Alert, AlertIcon } from "@common/ui";
import PropTypes from "prop-types";

const AlertWithIcon = ({ children, ...props }) => {
  return (
    <Alert {...props}>
      <AlertIcon />
      {children}
    </Alert>
  );
};

export default AlertWithIcon;

AlertWithIcon.propTypes = {
  children: PropTypes.node,
  props: PropTypes.object,
};
