import React, { useState } from "react";

import {
  Box,
  Image,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  DarkMode,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
} from "@common/ui";
import { getUserFullNameOrMail } from "@features/users/utils";
import emptyProfile from "@images/emptyProfile";
import usersApi from "@features/users/api";
import { COUNSELOR_ROLE } from "@app/constants";

const User = ({ user, refreshClub, isCounselor, canChangeRole }) => {
  const [loading, setLoading] = useState(false);

  const makeUserCounselor = (user) => {
    setLoading(false);
    usersApi.addRole(user.id, { roleName: COUNSELOR_ROLE }).finally(() => {
      setLoading(false);
      refreshClub();
    });
  };

  const removeCounselor = (user) => {
    setLoading(true);
    usersApi.removeRole(user.id, { roleName: COUNSELOR_ROLE }).finally(() => {
      setLoading(false);
      refreshClub();
    });
  };

  if (!canChangeRole) {
    return (
      <Box textAlign="center">
        <Image
          size="50px"
          rounded="full"
          mb={2}
          src={user.profile_image || emptyProfile}
          display="inline-block"
        />
        <Text isTruncated>{getUserFullNameOrMail(user)}</Text>
      </Box>
    );
  }

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Box textAlign="center">
          <Image
            size="50px"
            rounded="full"
            mb={2}
            src={user.profile_image || emptyProfile}
            display="inline-block"
          />
          <Text isTruncated>{getUserFullNameOrMail(user)}</Text>
        </Box>
      </PopoverTrigger>

      <DarkMode>
        <PopoverContent border="0" zIndex={4} color="white">
          <PopoverArrow />
          <PopoverCloseButton />
          <Box p={5}>
            <Text textAlign="center" mb={4}>
              {isCounselor
                ? "¿Deseas remover a este usuario como Orientador?"
                : "¿Deseas hacer a este usuario Orientador?"}
            </Text>
            <Box textAlign="center">
              <Button
                variantColor={isCounselor ? "red" : "blue"}
                size="sm"
                isLoading={loading}
                onClick={() => (isCounselor ? removeCounselor(user) : makeUserCounselor(user))}
              >
                {isCounselor ? "Remover orientador" : "Hacer orientador"}
              </Button>
            </Box>
          </Box>
        </PopoverContent>
      </DarkMode>
    </Popover>
  );
};

export default User;
