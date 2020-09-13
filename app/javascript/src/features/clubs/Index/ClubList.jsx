import React, { useEffect } from "react";
import { Box, SimpleGrid } from "@common/ui";
import Card from "@common/components/Card";
import { useSelector, useDispatch } from "react-redux";
import { list, setPage } from "@features/clubs/clubsSlice";
import clubsApi from "@features/clubs/api";
import { clubsState, clubsCovers } from "@features/clubs/selectors";
import { currentUserClub } from "@features/users/selectors";
import Actions from "./Actions";
import { useHistory } from "react-router-dom";
import { clubUrl } from "@utils/app/urlHelpers";
import Pagination from "@common/components/Pagination";
import { LOADING } from "@app/constants";
import { fetchUser } from "@features/users/usersSlice";

const ClubList = () => {
  const history = useHistory();
  const clubs = useSelector((state) => clubsState(state).all.clubs);
  const pagination = useSelector((state) => clubsState(state).all.pagination);
  const covers = useSelector((state) => clubsCovers(state));
  const loading = useSelector((state) => clubsState(state).status === LOADING);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(list());
  }, []);

  const currentClub = useSelector(currentUserClub);

  const handlePageClick = (page) => {
    dispatch(setPage(page));
    dispatch(list({ page }));
  };

  const setAsCurrentClub = (clubId) => {
    clubsApi.setCurrentClub(clubId).then(() => dispatch(fetchUser()));
  };

  return (
    <>
      <Actions />
      <SimpleGrid mt="1rem" columns={{ sm: 2, md: 4 }} spacing="3rem">
        {clubs.map((club) => {
          const clubCoverId = club.relationships?.cover?.data?.id;
          const coverUrl = clubCoverId ? covers.find((cover) => cover.id === clubCoverId)?.attributes?.file?.url : "";
          return (
            <Box key={club.id} mb="8">
              <Card
                cursor="pointer"
                onClick={() => history.push(clubUrl(club.id))}
                title={club.attributes.name}
                imageUrl={coverUrl}
                height="100%"
                mb="2"
              />
              <Box textAlign="center">
                { currentClub?.id === club.id
                  ? "Club actualmente Activo"
                  : (
                    <Box display="inline-block" cursor="pointer" onClick={() => setAsCurrentClub(club.id)}>
                      Activar
                    </Box>
                  )
                }
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
      {!loading && (
        <Pagination pagination={pagination} handlePageClick={handlePageClick} />
      )}
    </>
  );
};

export default ClubList;
