import React, { useEffect, useState } from "react";
import {
  currentClub,
  currentClubCovers,
  currentClubCurrentUserRoles,
  clubStatus,
} from "@features/clubs/selectors";
import { Box, Text, Skeleton, Flex, Badge, Image, Tag, TagLabel, Button } from "@common/ui";
import { useParams, useHistory } from "react-router-dom";
import { find, destroy } from "@features/clubs/clubsSlice";
import { getAreaColor, translateArea } from "@features/clubs/utils";
import { useDispatch, useSelector } from "react-redux";
import clubsApi from "@features/clubs/api";
import { LOADING } from "@app/constants";
import EditButton from "@common/components/EditButton";
import DeleteButton from "@common/components/DeleteButton";
import InviteUsers from "@common/components/InviteUsers";
import { COUNSELOR_ROLE } from "@app/constants";
import { clubsUrl, editClubUrl } from "@utils/app/urlHelpers";
import ConfirmDeleteModal from "@common/components/ConfirmDeleteModal";
import strings from "@common/strings";
import clubPlaceholder from "@images/clubPlaceholder";
import UsersList from "@features/clubs/components/UsersList";
import { fetchUser } from "@features/users/usersSlice";

const ShowClub = () => {
  const club = useSelector((state) => currentClub(state));
  const loading = useSelector((state) => clubStatus(state) === LOADING);
  const covers = useSelector((state) => currentClubCovers(state));
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUserRoles = useSelector((state) => currentClubCurrentUserRoles(state));
  const history = useHistory();
  const isCurrentUserCounselor = currentUserRoles?.includes(COUNSELOR_ROLE);

  const [confirmDeleteIsOpen, setConfirmDeleteIsOpen] = useState(false);
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    const fetchClub = async () => {
      const response = await dispatch(find(id));
      if (response.payload.status === 404) {
        history.push(clubsUrl());
      }
    };
    fetchClub();
  }, [id, refreshIndex]);

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

  const handleLeaveClub = () => {
    clubsApi.leaveClub(id).then(() => dispatch(fetchUser()).then(() => history.push(clubsUrl())));
  }

  return (
    <>
      <Skeleton mt="8" isLoaded={!loading}>
        <Flex align="center" justify="space-between">
          <Flex align="center">
            <Text mr="2" fontSize="5xl">
              {club?.attributes?.name}
            </Text>
            <Tag p="2" rounded="full" variant="solid" variantColor="green" size="sm">
              {club?.attributes?.formal ? "Formal" : "No formal"}
            </Tag>
          </Flex>
          {isCurrentUserCounselor ? (
            <Flex wrap="wrap" ml="2">
              <InviteUsers mr="4" my="1" clubId={id} />
              <EditButton mr="4" my="1" onClick={handleEdit} />
              <DeleteButton my="1" onClick={handleDelete} />
            </Flex>
          ) : <Button variantColor="red" onClick={handleLeaveClub}>Abandonar Club</Button>}
        </Flex>
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <Flex align="center">
          <Badge
            fontSize="xl"
            mr="4"
            variant="solid"
            variantColor={getAreaColor(club?.attributes?.area)}
          >
            {translateArea(club?.attributes?.area)}
          </Badge>
          <Badge variant="outline" fontSize="xl">
            {club?.attributes?.category}
          </Badge>
        </Flex>
      </Skeleton>

      <Flex my="10">
        <Flex flex="1" pr="6">
          <Skeleton isLoaded={!loading}>
            <Image
              borderRadius="lg"
              src={covers[0]?.attributes?.file?.large?.url ?? clubPlaceholder}
              alt={club?.attributes?.name}
              width="100%"
            />
          </Skeleton>
        </Flex>
        <Flex flex="3" direction="column" pl="6">
          <Skeleton isLoaded={!loading} mb={6}>
            <Box p={4} boxShadow="lg" borderRadius="md" backgroundColor={"gray.50"}>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Descripción del club
              </Text>
              <Text>
                {club?.attributes?.description || "El club aún no tiene una descripción."}
              </Text>
            </Box>
          </Skeleton>
          <UsersList
            counselorUsers={club?.attributes?.counselorUsers}
            memberUsers={club?.attributes?.memberUsers}
            isLoaded={!loading}
            refreshClub={() => setRefreshIndex(refreshIndex + 1)}
            isCurrentUserCounselor={isCurrentUserCounselor}
          />
        </Flex>
      </Flex>

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
