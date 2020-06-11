import React, { useEffect } from "react";
import { SimpleGrid } from "@common/ui";
import Card from "@common/components/Card";
import { useSelector, useDispatch } from "react-redux";
import { list } from "@features/clubs/clubsSlice";
import { clubsState } from "@features/clubs/selectors";
import Actions from "./Actions";

const ClubList = () => {
  const clubs = useSelector((state) => clubsState(state).all.clubs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(list());
  }, []);

  return (
    <>
      <Actions />
      <SimpleGrid mt="1rem" columns={{ sm: 2, md: 4 }} spacing="3rem">
        {clubs.map((club) => (
          <Card key={club.id} title={club.attributes.name}></Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ClubList;
