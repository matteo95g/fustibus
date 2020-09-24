import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { useDispatch } from "react-redux";
import invitationsApi from "@features/invitations/api";
import { list } from "@features/clubs/clubsSlice";
import { fetchUser } from "@features/users/usersSlice";
import { Box, Flex, Menu, MenuButton, MenuList, Icon, Spinner } from "@common/ui";
import notificationIcon from "@images/icons/notification.svg";

const InvitationsMenu = ({ invitations }) => {
  const dispatch = useDispatch();
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);

  const acceptInvitation = (id) => {
    setLoadingAccept(true);

    invitationsApi
      .accept(id)
      .then(() => {
        dispatch(fetchUser());
        dispatch(list());
      })
      .finally(setLoadingAccept(false));
  };

  const rejectInvitation = (id) => {
    setLoadingReject(true);

    invitationsApi
      .reject(id)
      .then(() => dispatch(fetchUser()))
      .finally(setLoadingReject(false));
  };

  return (
    <Menu>
      <MenuButton position="relative">
        <ReactSVG src={notificationIcon} />
        {invitations.length > 0 && (
          <Box
            bg="red.300"
            rounded="full"
            fontSize="xs"
            position="absolute"
            width="18px"
            height="18px"
            top="0"
            right="0"
            transform="translate(5px, -5px)"
          >
            {invitations.length}
          </Box>
        )}
      </MenuButton>

      <MenuList color="black" placement="bottom-end">
        {invitations.length === 0 ? (
          <Box p="4" maxWidth="2xs" textAlign="center">
            No tienes ninguna invitación pendiente
          </Box>
        ) : (
          invitations.map((invitation) => (
            <Box
              key={invitation.id}
              mx="3"
              py="2"
              borderBottomWidth={invitations[invitations.length - 1] === invitation ? "0" : "1px"}
            >
              <Flex justify="space-between" alignItems="center">
                <Flex mr="5">
                  Nueva invitación del club
                  <Box bg="blue.100" ml="2">
                    {invitation.club.attributes.name}
                  </Box>
                </Flex>
                <Flex alignItems="center">
                  {loadingAccept ? (
                    <Spinner size="sm" speed="0.65s" color="blue.200" mr="2" />
                  ) : (
                    <Icon
                      name="check"
                      p="1"
                      mr="2"
                      bg="gray.100"
                      color="green.500"
                      size="22px"
                      cursor="pointer"
                      pointerEvents={loadingReject ? "none" : "default"}
                      opacity={loadingReject ? "50%" : "100%"}
                      onClick={() => acceptInvitation(invitation.id)}
                    />
                  )}

                  {loadingReject ? (
                    <Spinner size="sm" speed="0.65s" color="blue.200" mr="2" />
                  ) : (
                    <Icon
                      name="close"
                      p="1"
                      bg="gray.100"
                      color="red.500"
                      size="22px"
                      cursor="pointer"
                      cursor="pointer"
                      pointerEvents={loadingAccept ? "none" : "default"}
                      opacity={loadingAccept ? "50%" : "100%"}
                      onClick={() => rejectInvitation(invitation.id)}
                    />
                  )}
                </Flex>
              </Flex>
            </Box>
          ))
        )}
      </MenuList>
    </Menu>
  );
};

export default InvitationsMenu;
