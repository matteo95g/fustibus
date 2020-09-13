import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Heading, Flex, Link, Menu, MenuButton, MenuList, MenuItem, Icon, Image, MenuDivider } from "@common/ui";
import { useHistory } from "react-router-dom";
import { homeUrl, clubsUrl, profileUrl } from "@utils/app/urlHelpers";
import { logout } from "@features/users/usersSlice";
import { currentUser, currentUserImage, currentUserClub, currentUserInvitations } from "@features/users/selectors";
import emptyProfile from "@images/emptyProfile";
import InvitationsMenu from './InvitationsMenu';
import { clubUrl } from "@utils/app/urlHelpers";

const MenuItems = ({ children, ...props }) => (
  <Link mt={{ base: 4, md: 0 }} mr={6} display={{ xs: "block", md: "inline-block" }} {...props}>
    {children}
  </Link>
);

const Navbar = (props) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(currentUser);
  const imageUrl = useSelector((state) => currentUserImage(state))?.attributes?.file?.url;
  const currentClub = useSelector(currentUserClub);

  const logoutUser = () => {
    dispatch(logout());
  };

  const invitations = useSelector(currentUserInvitations)

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="blue.900" color="white" {...props}>
      <Heading as="h1" mr={10} size="lg" cursor="pointer" onClick={() => history.push(homeUrl())}>
        Fustibus
      </Heading>

      <Box display={{ xs: "block", md: "none" }} onClick={handleToggle}>
        <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box display={{ xs: show ? "block" : "none", md: "flex" }} width={{ xs: "full", md: "auto" }}>
        <Box display={{ xs: "block", md: "flex" }} justifyContent="space-between" alignItems="center" width="full">
          <Flex alignItems="center" >
            <Box pr="4">
              <InvitationsMenu invitations={invitations} />
            </Box>
            <Box>
              {currentClub && (
                <Box>
                  Club actual:
                  <Link ml="2" onClick={() => history.push(clubUrl(currentClub?.id))}>
                    {currentClub?.name}
                  </Link>
                </Box>
              )}
              <Menu>
                <MenuButton as={Link} rightIcon="chevron-down" color="white">
                  {user?.attributes?.email}
                  <Icon name="chevron-down" />
                </MenuButton>
                <MenuList color="blue.900">
                  <MenuItem minH="48px" onClick={() => history.push(profileUrl())}>
                    <Image size="2rem" rounded="full" src={imageUrl ? imageUrl : emptyProfile} mr="12px" />
                    <span>Mi perfil</span>
                  </MenuItem>
                  <MenuItem onClick={() => history.push(clubsUrl())}>Mis clubes</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => logoutUser()} color="red.500">
                    Cerrar sesión
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Navbar;
