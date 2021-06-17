import React, { useEffect, useState, useReducer } from "react";
import { entriesState } from "@features/entries/selectors";
import { currentFieldFolder } from "@features/fieldFolders/selectors";
import { Box, Text, Skeleton, Flex, Image, Icon, Button, Divider, IconButton } from "@common/ui";
import { find } from "@features/fieldFolders/fieldFoldersSlice";
import { list, destroy } from "@features/entries/entriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { LOADING } from "@app/constants";
import Actions from "./Actions";
import emptyBox from "@images/emptyBox";
import ConfirmDeleteEntryModal from "@features/entries/Delete";
import moment from "moment";
import { reducer, DELAY_TIMEOUT } from "@utils/app/forms";
import useDebounce from "@utils/app/useDebounce";
import { newEntryUrl, editEntryUrl } from "@utils/app/urlHelpers";
import { useHistory } from "react-router-dom";

const FieldFolderShow = () => {
  const entries = useSelector((state) => entriesState(state)?.current?.entries);
  const loading = useSelector((state) => entriesState(state)?.status === LOADING);
  const id = useSelector((state) => currentFieldFolder(state)?.id);

  const dispatch = useDispatch();

  const [currentEntry, setCurrentEntry] = useState(null);
  const [confirmDeleteIsOpen, setConfirmDeleteIsOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(find());
  }, []);

  const initialFilters = {
    date: null,
    content: null,
  };

  const [filters, setFilters] = useReducer(reducer, initialFilters);
  const debouncedFilters = useDebounce(filters, DELAY_TIMEOUT);
  const isFiltering = filters.date || filters.content;
  const isLoaded = isFiltering ? true : !loading;

  useEffect(() => {
    if (debouncedFilters) {
      dispatch(list(id, debouncedFilters));
    }
  }, [id, debouncedFilters]);

  const handleDeleteEntry = (entry) => {
    setCurrentEntry(entry);
    setConfirmDeleteIsOpen(true);
  };

  const onDeleteConfirm = () => {
    dispatch(destroy(id, currentEntry.id));
    setConfirmDeleteIsOpen(false);
  };

  const handleEditEntry = async (entry) => {
    history.push(editEntryUrl(entry.id), entry);
  };

  return (
    <Box p={10}>
      <Skeleton isLoaded={isLoaded}>
        <Flex align="center">
          <Text fontSize="5xl" mr="5">
            Carpeta de campo
          </Text>
          <Button
            mt="1"
            rightIcon="plus-square"
            variantColor="green"
            onClick={() => history.push(newEntryUrl())}
          >
            Crear Entrada
          </Button>
        </Flex>
      </Skeleton>
      <Skeleton isLoaded={isLoaded}>
        <Actions filters={filters} setFilters={setFilters} initialFilters={initialFilters} />
      </Skeleton>
      <Divider mb="4" />
      <Skeleton isLoaded={isLoaded}>
        {entries?.length ? (
          <>
            {entries.map((entry) => (
              <Flex align="center" h="120px" key={entry.id}>
                <Box w="10%">
                  <Text textAlign="right">{moment(entry?.attributes?.date).format("LL")}</Text>
                </Box>
                <Flex w="5%" direction="column" align="center" h="100%">
                  <Box bg="blue.700" h="100%" w="2px" color="white" />
                  <Icon name="time" mx="2" />
                  <Box bg="blue.700" h="100%" w="2px" color="white" />
                </Flex>
                <Box my="2" borderWidth="1px" rounded="lg" p="2">
                  <Flex align="center">
                    <Text fontSize="2xl" mr="2">
                      {entry?.attributes?.title}
                    </Text>
                    <IconButton
                      variant="link"
                      variantColor="teal"
                      icon="edit"
                      onClick={() => handleEditEntry(entry)}
                    />
                    <IconButton
                      variant="link"
                      variantColor="red"
                      icon="delete"
                      onClick={() => handleDeleteEntry(entry)}
                    />
                  </Flex>
                  <Text>{entry?.attributes?.description}</Text>
                </Box>
              </Flex>
            ))}
          </>
        ) : (
          !isFiltering && (
            <Flex align="center" flexDirection="column">
              <Text fontSize="3xl">Todavia no existe ninguna entrada. ¿Que tal si creas una?</Text>
              <Image src={emptyBox} />
            </Flex>
          )
        )}
      </Skeleton>
      <ConfirmDeleteEntryModal
        isOpen={confirmDeleteIsOpen}
        setIsOpen={setConfirmDeleteIsOpen}
        onDeleteConfirm={onDeleteConfirm}
      />
    </Box>
  );
};

export default FieldFolderShow;
