import React, { useState } from "react";
import { Alert, AlertIcon, Flex, Box, Icon, AlertDescription, CloseButton } from "@common/ui";
import PropTypes from "prop-types";

const AlertWithIcon = ({ children, ...props }) => {
  const [hide, setHide] = useState(false);

  const handleClose = (e) => {
    setHide(true);
  };

  return (
    <Alert {...props} className={`${hide ? "hide" : ""}`}>
      <AlertIcon />
      <AlertDescription>{children}</AlertDescription>
      <CloseButton onClick={(e) => handleClose(e)} position="absolute" right="8px" top="8px" />
    </Alert>
  );
};

export default AlertWithIcon;

AlertWithIcon.propTypes = {
  children: PropTypes.node,
  props: PropTypes.object,
};
