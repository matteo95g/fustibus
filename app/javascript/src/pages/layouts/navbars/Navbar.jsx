import React, { useState } from "react";
import { Box, Heading, Flex, Link } from "@common/ui";
import { useHistory } from "react-router-dom";
import { homeUrl, clubsUrl } from "@utils/app/urlHelpers";

const MenuItems = ({ children, ...props }) => (
  <Link mt={{ base: 4, md: 0 }} mr={6} display="block" {...props}>
    {children}
  </Link>
);

const Navbar = (props) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const history = useHistory();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="blue.900"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" cursor="pointer" onClick={() => history.push(homeUrl())}>
          Club de Ciencia
        </Heading>
      </Flex>

      <Box display={{ xs: "block", md: "none" }} onClick={handleToggle}>
        <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ xs: show ? "block" : "none", md: "flex" }}
        width={{ xs: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems onClick={() => history.push(clubsUrl())}>Clubs</MenuItems>
        <MenuItems>Link2</MenuItems>
        <MenuItems>Link3</MenuItems>
      </Box>
    </Flex>
  );
};

export default Navbar;
