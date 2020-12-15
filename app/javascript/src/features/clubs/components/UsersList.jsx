import React from "react";
import { useSelector } from "react-redux";

import { Box, Skeleton, Text } from "@common/ui";
import User from "@features/clubs/components/User";
import { currentUser } from "@features/users/selectors";

const UsersList = ({
  counselorUsers,
  memberUsers,
  isLoaded,
  refreshClub,
  isCurrentUserCounselor,
}) => {
  const currentUserId = useSelector(currentUser)?.id;

  return (
    <Box>
      <Box mb={4}>
        <Skeleton isLoaded={isLoaded} mb={2}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            {counselorUsers?.length > 1 ? "Orientadores" : "Orientador"}
          </Text>
        </Skeleton>
        <Box mx={-2}>
          {counselorUsers?.map((user) => (
            <Skeleton key={user.id} isLoaded={isLoaded} display="inline-block" mx={2} w="90px">
              <User
                user={user}
                refreshClub={refreshClub}
                isCounselor={true}
                canChangeRole={isCurrentUserCounselor && `${user.id}` !== currentUserId}
              />
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
        {memberUsers?.map((user) => (
          <Skeleton key={user.id} isLoaded={isLoaded} display="inline-block" mx={2} w="90px">
            <User
              user={user}
              refreshClub={refreshClub}
              isCounselor={false}
              canChangeRole={isCurrentUserCounselor}
            />
          </Skeleton>
        ))}
      </Box>
      {memberUsers?.length === 0 && "El club aun no tiene miembros."}
    </Box>
  );
};

export default UsersList;
