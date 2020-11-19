import React, { useEffect } from "react";
import { Box, SimpleGrid, Image, Heading, Flex, Text } from "@common/ui";
import Card from "@common/components/Card";
import { useSelector, useDispatch } from "react-redux";
import { create } from "@features/notes/notesSlice";
import clubsApi from "@features/clubs/api";
import { clubsState, clubsCovers } from "@features/clubs/selectors";
import { currentUserClub } from "@features/users/selectors";
import { useHistory } from "react-router-dom";
import { newNoteUrl } from "@utils/app/urlHelpers";
import Pagination from "@common/components/Pagination";
import { LOADING } from "@app/constants";
import { fetchUser } from "@features/users/usersSlice";
import emptyClubs from "@images/emptyClubs";
import CreateButton from "@common/components/CreateButton";
import { newClubUrl } from "@utils/app/urlHelpers";
import clubPlaceholder from "@images/clubPlaceholder";

const NoteBookList = () => {
  const history = useHistory();
  const clubs = useSelector((state) => clubsState(state).all.clubs);
  const pagination = useSelector((state) => clubsState(state).all.pagination);
  const covers = useSelector((state) => clubsCovers(state));
  const loading = useSelector((state) => clubsState(state).status === LOADING);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(list());
  }, []);

  const currentClub = useSelector(currentUserClub);

  const handleNewNote = () => {};

  return (
    <Flex align="center" justify="space-between">
      <Text fontSize="5xl" mr="5">
        Libreta de apuntes
      </Text>
      <CreateButton label="Crear nota" onClick={() => history.push(newNoteUrl())} />
    </Flex>
  );
};

export default NoteBookList;
