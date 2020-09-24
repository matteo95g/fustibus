import React, { useEffect, useState } from "react";
import { currentClub, currentClubCovers, currentClubCurrentUserRoles, clubStatus } from "@features/clubs/selectors";
import { Box, Text, Skeleton, Flex, Badge, Image, Tag, TagLabel } from "@common/ui";
import { useParams, useHistory } from "react-router-dom";
import { find, destroy } from "@features/clubs/clubsSlice";
import { getAreaColor, translateArea } from "@features/clubs/utils";
import { useDispatch, useSelector } from "react-redux";
import { LOADING } from "@app/constants";
import EditButton from "@common/components/EditButton";
import DeleteButton from "@common/components/DeleteButton";
import InviteUsers from "@common/components/InviteUsers";
import { COUNSELOR_ROLE } from "@app/constants";
import { clubsUrl, editClubUrl } from "@utils/app/urlHelpers";
import ConfirmDeleteModal from "@common/components/ConfirmDeleteModal";
import strings from "@common/strings";

const ShowClub = () => {
  const club = useSelector((state) => currentClub(state));
  const loading = useSelector((state) => clubStatus(state) === LOADING);
  const covers = useSelector((state) => currentClubCovers(state));
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUserRoles = useSelector((state) => currentClubCurrentUserRoles(state));
  const history = useHistory();

  const [confirmDeleteIsOpen, setConfirmDeleteIsOpen] = useState(false);

  useEffect(() => {
    const fetchClub = async () => {
      const response = await dispatch(find(id));
      if (response.payload.status === 404) {
        history.push(clubsUrl());
      }
    };
    fetchClub();
  }, [id]);

  const onDeleteConfirm = () => {
    dispatch(destroy(id));
    setConfirmDeleteIsOpen(false);
    history.push(clubsUrl());
  };

  const handleDelete = () => {
    setConfirmDeleteIsOpen(true);
  };

  const handleEdit = () => {
    history.push(editClubUrl(id));
  };

  return (
    <>
      <Skeleton isLoaded={!loading}>
        <Flex align="center" justify="space-between">
          <Flex my="5" align="start">
            <Text mr="2" fontSize="5xl">
              {club?.attributes?.name}
            </Text>
            <Tag mt="2" rounded="full" variant="solid" variantColor="green" size="sm">
              <TagLabel>{club?.attributes?.formal ? "Formal" : "No formal"}</TagLabel>
            </Tag>
          </Flex>
          {currentUserRoles?.includes(COUNSELOR_ROLE) && (
            <Flex>
              <InviteUsers mr="4" clubId={id} />
              <EditButton mr="4" onClick={handleEdit} />
              <DeleteButton onClick={handleDelete} />
            </Flex>
          )}
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
      <ConfirmDeleteModal
        header={strings.Clubs.delete.confirmHeader}
        isOpen={confirmDeleteIsOpen}
        setIsOpen={setConfirmDeleteIsOpen}
        onDeleteConfirm={onDeleteConfirm}
      />
    </>
  );
};

export default ShowClub;
