import React, { useEffect, useState, useReducer } from "react";
import { entriesState } from "@features/entries/selectors";
import { Box, Text, Skeleton, Flex, Image, Icon } from "@common/ui";
import { useParams } from "react-router-dom";
import { find } from "@features/fieldFolders/fieldFoldersSlice";
import { list } from "@features/entries/entriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { LOADING } from "@app/constants";
import Actions from "./Actions";
import emptyBox from "@images/emptyBox";
import NewEntryModal from "@features/entries/New";
import moment from "moment";
import { reducer, DELAY_TIMEOUT } from "@utils/app/forms";

const FieldFolderShow = () => {
  const entries = useSelector((state) => entriesState(state)?.current?.entries);
  const loading = useSelector((state) => entriesState(state)?.status === LOADING);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(find(id));
  }, []);

  const initialFilters = {
    date: null,
    content: null,
  };

  const [filters, setFilters] = useReducer(reducer, initialFilters);
  const isFiltering = !filters.date || !filters.content;
  const isLoaded = isFiltering ? true : !loading;

  useEffect(() => {
    const timeOutId = setTimeout(() => dispatch(list(id, filters)), DELAY_TIMEOUT);
    return () => clearTimeout(timeOutId);
  }, [filters]);

  return (
    <>
      <Skeleton isLoaded={isLoaded}>
        <Text fontSize="5xl" mt="4" mr="2">
          Carpeta de campo
        </Text>
      </Skeleton>
      <Skeleton isLoaded={isLoaded}>
        <Actions setIsOpen={setIsOpen} filters={filters} setFilters={setFilters} initialFilters={initialFilters} />
      </Skeleton>
      <NewEntryModal isOpen={isOpen} setIsOpen={setIsOpen} fieldFolderId={id} />
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
                  <Text fontSize="2xl">{entry?.attributes?.title}</Text>
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
    </>
  );
};

export default FieldFolderShow;
