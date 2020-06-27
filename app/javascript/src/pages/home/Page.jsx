import React from 'react';
import { Box, Button, Flex, Heading, Text } from '@common/ui';
import { useHistory } from 'react-router-dom';
import { newClubUrl } from '@utils/app/urlHelpers';
import strings from '@common/strings';

const Home = () => {
  const history = useHistory();

  const goToNewClub = () => {
    history.push(newClubUrl());
  };

  const goToShuffle = () => {};

  return (
    <Box p={10} mb={4}>
      <Heading>{strings.homeTitle}</Heading>
      {/* TODO
        Fijarse si el usuario es parte de un club
      */}
      <Text mt={4}>{strings.homeSubtitle}</Text>
      <Flex mt={4} align="center">
        <Text>{strings.homeShuffle}</Text>
        <Button ml={2} variantColor="blue" onClick={goToShuffle}>
          {strings.shuffle}
        </Button>
      </Flex>
      <Flex mt={4} align="center">
        <Text>{strings.homeCreate}</Text>
        <Button ml={2} variantColor="green" onClick={goToNewClub}>
          {strings.create}
        </Button>
      </Flex>
    </Box>
  );
};

export default Home;
