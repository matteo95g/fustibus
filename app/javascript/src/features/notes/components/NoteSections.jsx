import React, { useState } from "react";
import {
  Flex,
  Text,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Box,
  Textarea,
  Input,
  List,
  ListItem,
  Image,
} from "@common/ui";
import { TEXT, TEXT_AND_IMAGE, LIST, IMAGE } from "@app/constants";
import FileUploader from "@common/components/FileUploader";

const TextAndImageSection = ({ index, section, updateSection }) => {
  const [data, setData] = useState({ image: section.payload.image, text: section.payload.text });

  const handleUpload = (files) => {
    const newData = { ...data, image: files[0].data, preview: files[0].data};
    setData(newData);
    updateSection(index, newData);
  };

  const handleChange = (value) => {
    const newData = { ...data, text: value };
    setData(newData);
    updateSection(index, newData);
  };

  return (
    <Flex flex="1">
      <Box w="30%">
        {section?.payload?.image === "" || section?.payload?.preview != null ? (
          <FileUploader hideSelectorOnPreview={true} handleUpload={handleUpload} />
        ) : (
          <Image borderRadius="lg" src={section?.payload?.image} width="300px" />
        )}
      </Box>
      <Textarea w="70%" ml="2" onChange={(e) => handleChange(e.target.value)} value={data.text} />
    </Flex>
  );
};

const ListSection = ({ index, section, handleAddListItem }) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    if (value === "") return;
    handleAddListItem(index, [...section.payload, value]);
    setValue("");
  };

  return (
    <Flex flex="1" flexDirection="column">
      <List styleType="disc" mb="2">
        {section.payload.map((item, i) => (
          <ListItem key={i}>{item}</ListItem>
        ))}
      </List>
      <Flex>
        <Input onChange={(e) => setValue(e.target.value)} value={value} />
        <Button ml="2" onClick={handleClick}>
          Agregar item
        </Button>
      </Flex>
    </Flex>
  );
};

const ImageSection = ({ index, updateSection, section }) => {
  const handleUpload = (files) => {
    updateSection(index, files[0].data);
  };

  return section?.payload?.image !== undefined ? (
    <Flex flex="1" justifyContent="center">
      <Image borderRadius="lg" src={section?.payload?.image} maxW="50%" />
    </Flex>
  ) : (
    <FileUploader hideSelectorOnPreview={true} handleUpload={handleUpload} />
  );
};

const NewNote = ({ sections, setSections }) => {
  const handleAddSection = (type) => {
    let newSection;
    let payload;

    if (type === LIST) {
      payload = [];
    } else if (type === TEXT_AND_IMAGE) {
      payload = {
        text: "",
        image: "",
        preview: null
      };
    } else {
      payload = null;
    }

    newSection = { sectionType: type, payload: payload };

    setSections([...sections, newSection]);
  };

  const updateSection = (index, value) => {
    let updatedSections = [...sections];
    let sectionUpdated = {
      ...sections[index],
      payload: value,
    };
    updatedSections[index] = sectionUpdated;
    setSections(updatedSections);
  };

  const handleTextAreaChange = (index, value) => {
    updateSection(index, value);
  };

  const handleAddListItem = (index, value) => {
    updateSection(index, value);
  };

  const handleDeleteItem = (index) => {
    let updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  }

  return (
    <>
      <Box my="5">
        {sections.map((section, index) => (
          <Flex key={index} my="4" justifyContent="space-between">
            {section.sectionType === TEXT && (
              <Textarea value={section.payload || ""} onChange={(e) => handleTextAreaChange(index, e.target.value)} />
            )}
            {section.sectionType === TEXT_AND_IMAGE && (
              <TextAndImageSection index={index} section={section} updateSection={updateSection} />
            )}
            {section.sectionType === LIST && (
              <ListSection index={index} section={section} handleAddListItem={handleAddListItem} />
            )}
            {section.sectionType === IMAGE && <ImageSection section={section} index={index} updateSection={updateSection} />}
            <Icon name="delete" ml="4" className="cursor-pointer" onClick={() => handleDeleteItem(index)}/>
          </Flex>
        ))}
      </Box>
      <Popover placement="top" my="5">
        <PopoverTrigger>
          <Flex
            className="cursor-pointer"
            borderWidth="2px"
            rounded="md"
            borderStyle="dashed"
            h="80px"
            borderColor="blue.200"
            bg="blue.100"
            justifyContent="center"
            alignItems="center"
          >
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
              <Text>Haz click aqui para agregar una sección</Text>
              <Icon name="plus-square" />
            </Flex>
          </Flex>
        </PopoverTrigger>
        <PopoverContent zIndex={4} maxW="60%" justifyContent="center" alignItems="center">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Button mx="1" onClick={() => handleAddSection(TEXT)}>
              Texto solo
            </Button>
            <Button mx="1" onClick={() => handleAddSection(TEXT_AND_IMAGE)}>
              Imagen + texto
            </Button>
            <Button mx="1" onClick={() => handleAddSection(LIST)}>
              Lista
            </Button>
            <Button mx="1" onClick={() => handleAddSection(IMAGE)}>
              Imagen sola
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NewNote;
