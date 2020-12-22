import React from "react";
import { Flex, Text, Image, List, ListItem, Box } from "@common/ui";

import { TEXT_STRING, TEXT_AND_IMAGE_STRING, LIST_STRING, IMAGE_STRING } from "@app/constants";

const NoteSection = ({ section }) => {
  const { attributes } = section;

  return (
    <Box mx="5rem">
      {attributes.sectionType === TEXT_STRING && <Text my="2rem"> {attributes.text} </Text>}
      {attributes.sectionType === TEXT_AND_IMAGE_STRING && (
        <Flex my="2rem">
          <Image src={attributes.url} mr="2" maxW="500px" rounded="md" />
          <Text my="4" ml="2">
            {attributes.text}
          </Text>
        </Flex>
      )}
      {attributes.sectionType === LIST_STRING && (
        <List styleType="disc" my="2rem">
          {attributes.list.map((item, i) => (
            <ListItem key={i}>{item}</ListItem>
          ))}
        </List>
      )}
      {attributes.sectionType === IMAGE_STRING && <Image src={attributes.url} rounded="md" />}
    </Box>
  );
};

export default NoteSection;
