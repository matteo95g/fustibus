import React, { useEffect } from "react";
import { clubsState, currentClubCovers } from "@features/clubs/selectors";
import { Box, Text, Skeleton, Flex, Badge, Image, Tag, TagLabel, Button } from "@common/ui";
import { useParams, useHistory } from "react-router-dom";
import { find } from "@features/clubs/clubsSlice";
import { getAreaColor, translateArea } from "@features/clubs/utils";
import { useDispatch, useSelector } from "react-redux";
import { LOADING } from "@app/constants";
import { fieldFolderUrl } from "@utils/app/urlHelpers";

const ShowClub = () => {
  const club = useSelector((state) => clubsState(state).current.club);
  const loading = useSelector((state) => clubsState(state).status === LOADING);
  const covers = useSelector((state) => currentClubCovers(state));
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(find(id));
  }, []);

  return (
    <>
      <Skeleton isLoaded={!loading}>
        <Flex my="5" align="start">
          <Text mr="2" fontSize="5xl">
            {club?.attributes?.name}
          </Text>
          <Tag mt="2" rounded="full" variant="solid" variantColor="green" size="sm">
            <TagLabel>{club?.attributes?.formal ? "Formal" : "No formal"}</TagLabel>
          </Tag>
        </Flex>
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <Flex align="center">
          <Badge fontSize="xl" mr="4" variant="solid" variantColor={getAreaColor(club?.attributes?.area)}>
            {translateArea(club?.attributes?.area)}
          </Badge>
          <Badge variant="outline" fontSize="xl">
            {club?.attributes?.category}
          </Badge>
        </Flex>
      </Skeleton>

      {covers[0] && (
        <Skeleton isLoaded={!loading}>
          <Box my="3">
            <Image width="50%" src={covers[0]?.attributes?.file?.large?.url} alt={club?.attributes?.name} />
          </Box>
        </Skeleton>
      )}
      <Skeleton isLoaded={!loading}>
        <Button my="3" onClick={() => history.push(fieldFolderUrl(id))}>
          Carpeta de campo
        </Button>
      </Skeleton>
    </>
  );
};

export default ShowClub;
