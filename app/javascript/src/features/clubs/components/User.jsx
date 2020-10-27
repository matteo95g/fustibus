import React from "react";

import { Box, Image, Text } from "@common/ui";
import { getUserFullNameOrMail } from "@features/users/utils";
import emptyProfile from "@images/emptyProfile";

const User = ({ user, userImage }) => {
  return (
    <Box textAlign="center">
      <Image
        size="50px"
        rounded="full"
        mb={2}
        src={userImage || emptyProfile}
        display="inline-block"
      />
      <Text isTruncated>{getUserFullNameOrMail(user)}</Text>
    </Box>
  );
};

export default User;
