import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box } from "@common/ui";
import { homeUrl } from "@utils/app/urlHelpers";

const Unauthenticated = ({ children }) => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.users.current.user);

  useEffect(() => {
    if (currentUser) {
      history.push(homeUrl());
    }
  }, [currentUser]);

  return (
    <React.Fragment>
      <Box>{children}</Box>
    </React.Fragment>
  );
};

export default Unauthenticated;
