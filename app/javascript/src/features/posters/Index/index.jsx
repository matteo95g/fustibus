import React from "react";
import { Box, Button, Heading, Text, Flex, List, ListItem } from "@common/ui";
import { newPosterUrl } from "@utils/app/urlHelpers";
import { useHistory } from "react-router-dom";
import strings from "@common/strings";

const Posters = () => {
  const history = useHistory();
  return (
    <Box p={10} mb={4}>
      <Heading as="h1" mb="4">
        {strings.Poster.index.title}
      </Heading>
      <Text fontSize="xl" my="4">
        {strings.Poster.index.description}
      </Text>
      <Text fontSize="xl" my="4">
        {strings.Poster.index.content}
      </Text>
      <Flex justifyContent="flex-end">
        <Text fontSize="xs" my="4" as="i" textAlign="right">
          <a href={strings.Poster.index.sourceWeb}>{strings.Poster.index.source}</a>
        </Text>
      </Flex>
      <Heading as="h3" mt="4">
        {strings.Poster.index.recomendations}
      </Heading>
      <Box w="100%" mt="6">
        <Box borderWidth="3px" p="3" m="1">
          <Heading textAlign="center" mb="2">
            {strings.Poster.sections.title}
          </Heading>
          <Text>
            Debe reflejar con exactitud el tema del estudio o trabajo, claro y conciso. Se recomienda no usar abrevaciones, siglas
            o acrónimos. \n Se recomienda usar letra Arial en negrita y al menos 36 puntos. No mas de 15 palabras.
          </Text>
        </Box>
        <Flex>
          <Flex direction="column" w="33.3%">
            <Box borderWidth="3px" p="3" m="1">
              <Heading textAlign="center" mb="2">
                {strings.Poster.sections.abstract}
              </Heading>
              <Text>
                En esta sección se presenta de forma sistemática la información más importante del estudio para que el lector
                tenga una idea general sobre proyecto.
              </Text>
            </Box>
            <Box borderWidth="3px" p="3" m="1">
              <Heading textAlign="center" mb="2">
                {strings.Poster.sections.introduction}
              </Heading>
              <Text>Sirve para familiarizar al lector, debe ser corta.</Text>
              <Text my="1">Algunos aspectos que debe contener:</Text>
              <List styleType="disc">
                <ListItem>Antecedentes y revisón del temas</ListItem>
                <ListItem>Importancia teórica</ListItem>
                <ListItem>Hipótesis</ListItem>
                <ListItem>Objectivo del trabajo</ListItem>
                <ListItem>Definiciones</ListItem>
              </List>
            </Box>
            <Box borderWidth="3px" p="3" m="1">
              <Heading textAlign="center" mb="2">
                {strings.Poster.sections.methodology}
              </Heading>
              <Text>
                Descripción de materiales y métodos, recoge el diseño del estudio, como se llevo a cabo, numero de fases,
                variables.
              </Text>
              <Text my="1">Algunas preguntas que interesa responder en esta sección:</Text>
              <List styleType="disc">
                <ListItem>¿Cómo tratamos el problema?</ListItem>
                <ListItem>¿Qué herramientas se usaron para esta investigación?</ListItem>
                <ListItem>¿Qué se hizo para obtener los datos?</ListItem>
              </List>
            </Box>
          </Flex>
          <Flex direction="column" w="33.3%">
            <Box height="100%" borderWidth="3px" p="3" m="1">
              <Heading textAlign="center" mb="2">
                {strings.Poster.sections.results}
              </Heading>
              <Text>Resumen de los resultados obtenidos.</Text>
              <Text>Selección de los datos mas relevantes y mas relacionados con el objectivo del estudio.</Text>
              <Text>Evitar los textos largos y con muchos datos.</Text>
              <Text>Se pueden incluir tablas, figuras, graficas.</Text>
            </Box>
          </Flex>
          <Flex direction="column" w="33.3%">
            <Box borderWidth="3px" p="3" m="1" h="33%">
              <Heading textAlign="center" mb="2">
                {strings.Poster.sections.conclusions}
              </Heading>
              <Text>Esta seccion busca responder las siguientes preguntas:</Text>
              <List styleType="disc">
                <ListItem>¿Qué aportó la investigación?</ListItem>
                <ListItem>¿Qué otras preguntas arrojó?</ListItem>
                <ListItem>¿Qué nos condujo para posteriores investigaciones?</ListItem>
              </List>
            </Box>
            <Box borderWidth="3px" p="3" m="1" h="33%">
              <Heading textAlign="center" mb="2">
                {strings.Poster.sections.bibliography}
              </Heading>
              <Text>Bibliografía utilizada para la investigación</Text>
            </Box>
            <Box borderWidth="3px" p="3" m="1" h="33%">
              <Heading textAlign="center" mb="2">
                {strings.Poster.sections.acknowledgments}
              </Heading>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Button my="6" onClick={() => history.push(newPosterUrl())}>
        Crear poster!
      </Button>
    </Box>
  );
};

export default Posters;
