import React from "react";
import { Box } from "@common/ui";

const Unauthenticated = ({ children }) => {
  return (
    <React.Fragment>
      <Box>{children}</Box>
    </React.Fragment>
  );
};

export default Unauthenticated;
