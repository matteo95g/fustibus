import React, { useEffect, useState } from "react";
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
  Image,
  Input,
  List,
  ListItem,
} from "@common/ui";
import Card from "@common/components/Card";
import { useSelector, useDispatch } from "react-redux";
import missionsApi from "@features/missions/api";
import { clubsState, clubsCovers } from "@features/clubs/selectors";
import { currentUserClub } from "@features/users/selectors";
import { useHistory } from "react-router-dom";
import { clubUrl } from "@utils/app/urlHelpers";
import Pagination from "@common/components/Pagination";
import { LOADING, TEXT, TEXT_AND_IMAGE, LIST, IMAGE, FILE } from "@app/constants";
import { fetchUser } from "@features/users/usersSlice";
import emptyClubs from "@images/emptyClubs";
import CreateButton from "@common/components/CreateButton";
import { newClubUrl } from "@utils/app/urlHelpers";
import clubPlaceholder from "@images/clubPlaceholder";
import NoteSections from "./NoteSections";
import FileUploader from "@common/components/FileUploader";

const NewNote = () => {
  const history = useHistory();
  const clubs = useSelector((state) => clubsState(state).all.clubs);
  const pagination = useSelector((state) => clubsState(state).all.pagination);
  const covers = useSelector((state) => clubsCovers(state));
  const loading = useSelector((state) => clubsState(state).status === LOADING);

  const dispatch = useDispatch();

  const [sections, setSections] = useState([]);
  const [position, setPosition] = useState(0);

  const currentClub = useSelector(currentUserClub);

  const TextAndImageSection = () => (
    <Box my="4">
      <Flex>
        <Image w="30%" mr="2" />
        <Textarea w="70%" ml="2" />
      </Flex>
    </Box>
  );

  const ListSection = () => (
    <Box my="4">
      <List styleType="disc" mb="2">
        <ListItem>Lorem ipsum dolor sit amet</ListItem>
        <ListItem>Consectetur adipiscing elit</ListItem>
        <ListItem>Integer molestie lorem at massa</ListItem>
        <ListItem>Facilisis in pretium nisl aliquet</ListItem>
      </List>
      <Flex>
        <Input />
        <Button ml="2">Agregar item</Button>
      </Flex>
    </Box>
  );

  const FileSection = () => <FileUploader />;

  const handleAddSection = (type) => {
    let newSection;
    setPosition(position + 1);

    // section_type: "text", url: nil, text: nil, list: [], position: 1, note_id: 1

    newSection = { sectionType: type };

    newSection.position = position;
    setSections([...sections, newSection]);
  };

  return (
    <>
      <Box my="5">
        {sections.map((section, index) => (
          <>
            {section.sectionType === TEXT && <Textarea my="4" value={section.text} />}
            {section.sectionType === TEXT_AND_IMAGE && <TextAndImageSection />}
            {section.sectionType === LIST && <ListSection />}
            {section.sectionType === IMAGE && <Image my="4" />}
            {section.sectionType === FILE && <FileSection />}
          </>
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
            <Button mx="1" onClick={() => handleAddSection("")}>
              Tabla
            </Button>
            <Button mx="1" onClick={() => handleAddSection(FILE)}>
              Archivo
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NewNote;
