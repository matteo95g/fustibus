import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box } from "@common/ui";
import { homeUrl } from "@utils/app/urlHelpers";

import { currentUser } from "@features/users/selectors";

const Unauthenticated = ({ children }) => {
  const history = useHistory();
  const user = useSelector(currentUser);

  useEffect(() => {
    if (user) {
      history.push(homeUrl());
    }
  }, [user]);

  return (
    <React.Fragment>
      <Box>{children}</Box>
    </React.Fragment>
  );
};

export default Unauthenticated;
