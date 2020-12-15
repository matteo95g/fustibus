import React from "react";
import { Flex, Text, Image, List, ListItem } from "@common/ui";

import { TEXT_STRING, TEXT_AND_IMAGE_STRING, LIST_STRING, IMAGE_STRING } from "@app/constants";

const NoteSection = ({ section }) => {
  const { attributes } = section;

  return (
    <>
      {attributes.sectionType === TEXT_STRING && <Text my="4"> {attributes.text} </Text>}
      {attributes.sectionType === TEXT_AND_IMAGE_STRING && (
        <Flex>
          <Image src={attributes.url} mr="2" />
          <Text my="4" ml="2">
            {attributes.text}
          </Text>
        </Flex>
      )}
      {attributes.sectionType === LIST_STRING && (
        <List styleType="disc" mb="2">
          {attributes.list.map((item, i) => (
            <ListItem key={i}>{item}</ListItem>
          ))}
        </List>
      )}
      {attributes.sectionType === IMAGE_STRING && <Image src={attributes.url} />}
    </>
  );
};

export default NoteSection;
