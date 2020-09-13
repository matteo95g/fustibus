import React from "react";
import { Box, Button, Flex, Heading, Text } from "@common/ui";
import BoxButton from "@common/components/BoxButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { newClubUrl, fieldFolderUrl, clubDiaryUrl } from "@utils/app/urlHelpers";
import strings from "@common/strings";

import { currentUserClub } from "@features/users/selectors";

const Home = () => {
  const history = useHistory();

  const currentClub = useSelector(currentUserClub);

  const goToNewClub = () => {
    history.push(newClubUrl());
  };

  const goToShuffle = () => {};

  return (
    <Box p={10} mb={4}>
      {currentClub && (
        <>
          <Heading>{strings.Home.titleClub + ' "' + currentClub.name + '"'}</Heading>
          <Box my="4">
            Mis Petates
            <Flex mt="4" align="center">
              <BoxButton title="Diario de Viaje" onClick={() => history.push(clubDiaryUrl(currentClub.id))} />
              <BoxButton title="Libreta de Apuntes" onClick={() => {}} />
            </Flex>
          </Box>
          Petates del Equipo
          <Flex mt="4" align="center">
            <BoxButton title="Carpeta de Campo" onClick={() => history.push(fieldFolderUrl(currentClub.id))} />
            <BoxButton title="Poster" onClick={() => {}} />
            <BoxButton title="Informe de Investigación" onClick={() => {}} />
          </Flex>
        </>
      )}
      {!currentClub && (
        <>
          <Heading>{strings.Home.title}</Heading>
          <Text mt={4}>{strings.Home.subtitle}</Text>
          <Flex mt={4} align="center">
            <Text>{strings.Home.shuffle}</Text>
            <Button ml={2} variantColor="blue" onClick={goToShuffle}>
              {strings.Actions.shuffle}
            </Button>
          </Flex>
          <Flex mt={4} align="center">
            <Text>{strings.Home.create}</Text>
            <Button ml={2} variantColor="green" onClick={goToNewClub}>
              {strings.Actions.create}
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Home;
