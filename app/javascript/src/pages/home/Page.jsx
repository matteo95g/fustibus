import React from "react";
import { Box, Button, Flex, Text } from "@common/ui";
import BoxButton from "@common/components/BoxButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { newClubUrl, fieldFolderUrl, clubDiaryUrl, postersUrl, reportsUrl, notebookUrl } from "@utils/app/urlHelpers";
import strings from "@common/strings";
import { currentUserClub } from "@features/users/selectors";

const Home = () => {
  const history = useHistory();

  const currentClub = useSelector(currentUserClub);

  const goToNewClub = () => {
    history.push(newClubUrl());
  };

  return (
    <Box p={10} mb={4}>
      {currentClub && (
        <>
          <Text fontSize="5xl">{strings.Home.titleClub + ' "' + currentClub.name + '"'}</Text>
          <Box my="4">
            <Text fontSize="xl">Mis Petates</Text>
            <Flex mt="4" align="center">
              <BoxButton title="Diario de Viaje" onClick={() => history.push(clubDiaryUrl())} />
              <BoxButton title="Libreta de Apuntes" onClick={() => history.push(notebookUrl())} />
            </Flex>
          </Box>
          <Text fontSize="xl">Petates del Equipo</Text>
          <Flex mt="4" align="center">
            <BoxButton title="Carpeta de Campo" onClick={() => history.push(fieldFolderUrl())} />
            <BoxButton title="Poster" onClick={() => history.push(postersUrl())} />
            <BoxButton title="Informe de Investigación" onClick={() => history.push(reportsUrl())} />
          </Flex>
        </>
      )}
      {!currentClub && (
        <>
          <Text fontSize="5xl">{strings.Home.title}</Text>
          <Text mt={4} fontSize="xl">
            {strings.Home.subtitle}
          </Text>
          <Flex mt={4} align="center">
            <Text>{strings.Home.create}</Text>
            <Button ml={2} variantColor="green" onClick={goToNewClub}>
              {strings.Actions.create}
            </Button>
          </Flex>
          <Text mt="4">{strings.Home.shuffle}</Text>
        </>
      )}
    </Box>
  );
};

export default Home;
