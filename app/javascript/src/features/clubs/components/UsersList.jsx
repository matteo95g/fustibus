import React from "react";

import { Box, Skeleton, Image, Text } from "@common/ui";
import { getUserFullNameOrMail } from "@features/users/utils";
import User from "@features/clubs/components/User";

const UsersList = ({ counselorUsers, membersUsers, usersImages, isLoaded }) => {
  const currentUserImage = (user) => {
    const userImageId = user.relationships?.image?.data?.id;
    const userImage = usersImages.find((img) => img.id === userImageId);

    return userImage?.attributes?.file?.url;
  };

  return (
    <Box>
      <Box mb={4}>
        <Skeleton isLoaded={isLoaded} mb={2}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            {counselorUsers.length > 1 ? "Orientadores" : "Orientador"}
          </Text>
        </Skeleton>
        <Box mx={-2}>
          {counselorUsers.map((user) => (
            <Skeleton key={user.id} isLoaded={isLoaded} display="inline-block" mx={2} w="90px">
              <User user={user} userImage={currentUserImage(user)} />
            </Skeleton>
          ))}
        </Box>
      </Box>
      <Skeleton isLoaded={isLoaded} mb={2}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Miembros
        </Text>
      </Skeleton>
      <Box mx={-2}>
        {membersUsers.map((user) => (
          <Skeleton key={user.id} isLoaded={isLoaded} display="inline-block" mx={2} w="90px">
            <User user={user} userImage={currentUserImage(user)} />
          </Skeleton>
        ))}
      </Box>
      {membersUsers.length === 0 && "El club aun no tiene miembros."}
    </Box>
  );
};

export default UsersList;
