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

  const currentClub = useSelector(currentUserClub);

  const TextAndImageSection = ({ index }) => {
    const [data, setData] = useState({});

    const handleUpload = (files) => {
      const newData = { ...data, image: files[0].data };
      setData(newData);
      updateSection(index, newData);
    };

    const handleChange = (value) => {
      const newData = { ...data, text: value };
      setData(newData);
      updateSection(index, newData);
    };

    return (
      <Box my="4">
        <Flex>
          <Box w="30%">
            <FileUploader hideSelectorOnPreview={true} handleUpload={handleUpload} />
          </Box>
          <Textarea w="70%" ml="2" onChange={(e) => handleChange(e.target.value)} />
        </Flex>
      </Box>
    );
  };

  const ListSection = ({ index, section, handleAddListItem }) => {
    const [value, setValue] = useState("");

    const handleClick = () => {
      handleAddListItem(index, [...section.payload, value]);
    };

    return (
      <Box my="4">
        <List styleType="disc" mb="2">
          {section.payload.map((item) => (
            <ListItem>{item}</ListItem>
          ))}
        </List>
        <Flex>
          <Input onChange={(e) => setValue(e.target.value)} />
          <Button ml="2" onClick={handleClick}>
            Agregar item
          </Button>
        </Flex>
      </Box>
    );
  };

  const ImageSection = () => {
    const handleUpdload = (files) => {
      // console.log(files);
    };

    return <FileUploader hideSelectorOnPreview={true} handleUpdload={handleUpdload} />;
  };

  const handleAddSection = (type) => {
    let newSection;
    let payload;

    if (type === LIST) {
      payload = [];
    } else if (type === TEXT_AND_IMAGE) {
      payload = {
        text: "",
        image: "",
      };
    } else {
      payload = null;
    }

    newSection = { sectionType: type, payload: payload };

    setSections([...sections, newSection]);
  };

  const updateSection = (index, payload) => {
    let updatedSections = [...sections];
    let sectionUpdated = {
      ...sections[index],
      payload: payload,
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

  return (
    <>
      <Box my="5">
        {sections.map((section, index) => (
          <div key={index}>
            {section.sectionType === TEXT && (
              <Textarea my="4" value={section.text} onChange={(e) => handleTextAreaChange(e.target.value, index)} />
            )}
            {section.sectionType === TEXT_AND_IMAGE && <TextAndImageSection index={index} section={section} />}
            {section.sectionType === LIST && (
              <ListSection index={index} section={section} handleAddListItem={handleAddListItem} />
            )}
            {section.sectionType === IMAGE && <ImageSection />}
          </div>
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
