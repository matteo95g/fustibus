import React, { useEffect } from "react";
import { SimpleGrid } from "@common/ui";
import Card from "@common/components/Card";
import { useSelector, useDispatch } from "react-redux";
import { list } from "@features/clubs/clubsSlice";
import { clubsState, clubsCovers } from "@features/clubs/selectors";
import Actions from "./Actions";
import { useHistory } from "react-router-dom";
import { clubUrl } from "@utils/app/urlHelpers";

const ClubList = () => {
  const history = useHistory();
  const clubs = useSelector((state) => clubsState(state).all.clubs);
  const covers = useSelector((state) => clubsCovers(state));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(list());
  }, []);

  return (
    <>
      <Actions />
      <SimpleGrid mt="1rem" columns={{ sm: 2, md: 4 }} spacing="3rem">
        {clubs.map((club) => {
          const clubCoverId = club.relationships?.cover?.data?.id;
          const coverUrl = clubCoverId ? covers.find((cover) => cover.id === clubCoverId)?.attributes?.file?.url : "";
          return (
            <Card
              cursor="pointer"
              onClick={() => history.push(clubUrl(club.id))}
              key={club.id}
              title={club.attributes.name}
              imageUrl={coverUrl}
            ></Card>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default ClubList;
