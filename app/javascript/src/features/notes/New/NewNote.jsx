import React, { useEffect, useState } from "react";
import { Text, Select } from "@common/ui";
import Card from "@common/components/Card";
import { useSelector, useDispatch } from "react-redux";
import missionsApi from "@features/missions/api";
import { clubsState, clubsCovers } from "@features/clubs/selectors";
import { currentUserClub } from "@features/users/selectors";
import { useHistory } from "react-router-dom";
import { clubUrl } from "@utils/app/urlHelpers";
import Pagination from "@common/components/Pagination";
import { LOADING } from "@app/constants";
import { fetchUser } from "@features/users/usersSlice";
import emptyClubs from "@images/emptyClubs";
import CreateButton from "@common/components/CreateButton";
import { newClubUrl } from "@utils/app/urlHelpers";
import clubPlaceholder from "@images/clubPlaceholder";
import NoteSections from "./NoteSections";

const NewNote = () => {
  const history = useHistory();
  const clubs = useSelector((state) => clubsState(state).all.clubs);
  const pagination = useSelector((state) => clubsState(state).all.pagination);
  const covers = useSelector((state) => clubsCovers(state));
  const loading = useSelector((state) => clubsState(state).status === LOADING);

  const dispatch = useDispatch();

  const [missions, setMissions] = useState([]);
  const [selectedMissionId, setSelectedMissionId] = useState(null);

  useEffect(() => {
    async function anyNameFunction() {
      const clubMissions = await missionsApi.list();
      setMissions(clubMissions.data.data);
    }
    anyNameFunction();
  }, []);

  const currentClub = useSelector(currentUserClub);

  return (
    <>
      <Text fontSize="5xl" mr="5">
        Nueva nota
      </Text>
      <Select placeholder="Selecciona una misión" my="5" onChange={(e) => setSelectedMissionId(e.target.value)}>
        {missions?.map((mission) => (
          <option key={mission.id} value={mission.id}>
            {mission.attributes.name}
          </option>
        ))}
      </Select>
      <NoteSections />
    </>
  );
};

export default NewNote;
