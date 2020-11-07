import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { REQUIRED, COMPLETE } from "@app/constants";
import { listMissions, createMission, updateMission, deleteMission } from "@features/clubDiary/clubDiarySlice";
import { missionsState, missionStatus, updateMissionStatus, deleteMissionStatus } from "@features/clubDiary/selectors";
import { Formik, Form } from "formik";
import FormikTextInput from "@common/components/FormikTextInput";
import FormikTextArea from "@common/components/FormikTextArea";
import DeleteButton from "@common/components/DeleteButton";
import EditButton from "@common/components/EditButton";
import MissionsList from "@features/clubDiary/components/MissionsList";
import MissionDetail from "@features/clubDiary/components/MissionDetail";
import { Skeleton, Flex, Stack, Button } from "@common/ui";
import { LOADING } from "@app/constants";
import { currentUser } from "@features/users/selectors";
import { useDispatch, useSelector } from "react-redux";

const MissionsPanel = ({}) => {
  const dispatch = useDispatch();
  const missions = useSelector((state) => missionsState(state));
  const createMissionStatus = useSelector((state) => missionStatus(state));
  const deleteStatus = useSelector((state) => deleteMissionStatus(state));
  const updateStatus = useSelector((state) => updateMissionStatus(state));
  const isLoaded = true;
  const [selectedMission, setMission] = useState(null);
  const [newMission, setNewMission] = useState(false);
  const [editingMission, setEditingMission] = useState(false);

  const onMissionSelected = (mission) => {
    setNewMission(false);
    if (selectedMission && mission.id == selectedMission.id) {
      setMission(null);
    } else {
      setMission(mission);
    }
  };

  // Mission Handling

  const onNewMission = () => {
    setNewMission(!newMission);
  };

  const initialValues = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(REQUIRED),
    description: Yup.string().required(REQUIRED),
  });

  const handleSubmit = (values) => {
    if (editingMission) {
      dispatch(updateMission(selectedMission.id, values));
    } else {
      dispatch(createMission(values));
    }
  };

  const onEditMission = () => {
    setEditingMission(!editingMission);
  };

  const onDeleteMission = () => {
    // TODO Advertirle al usuario que se va a borrar la misión
    // y que los posibles apuntes asociados también.
    // Checho 15/10/20
    const { id } = selectedMission;
    dispatch(deleteMission(id));
  };

  useEffect(() => {
    if (createMissionStatus == COMPLETE || updateStatus == COMPLETE || deleteStatus == COMPLETE) {
      dispatch(listMissions());
      setNewMission(false);
      setEditingMission(false);
      setMission(null);
    }
  }, [createMissionStatus, updateStatus, deleteStatus]);

  const {
    attributes: { isCounselor },
  } = useSelector(currentUser);

  return (
    <>
      <Flex pt="4" justifyContent="space-between" alignItems="center">
        <Stack isInline spacing={8} align="center">
          {isCounselor && (
            <Button rightIcon="small-add" variantColor="blue" onClick={onNewMission}>
              Nueva Misión
            </Button>
          )}
        </Stack>
        {isCounselor && selectedMission && (
          <Flex>
            <EditButton mr="4" onClick={onEditMission} />
            <DeleteButton onClick={onDeleteMission} />
          </Flex>
        )}
      </Flex>

      <Skeleton isLoaded={isLoaded}>
        <Flex mt="4">
          <MissionsList
            missions={missions}
            onSelect={onMissionSelected}
            selectedId={selectedMission ? selectedMission.id : null}
          />
          {!newMission && !editingMission && selectedMission && <MissionDetail mission={selectedMission} />}
          {!newMission && !selectedMission && (
            <Flex flex="1" ml="4">
              Selecciona una misión para ver en detalle.
            </Flex>
          )}
          {(newMission || editingMission) && (
            <Flex flex="1" alignSelf="stretch" ml="4" flexDirection="column" borderColor="black" borderWidth="0.5px">
              <Formik
                initialValues={
                  editingMission
                    ? { name: selectedMission.attributes.name, description: selectedMission.attributes.description }
                    : initialValues
                }
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                <Form>
                  <FormikTextInput my="4" name="name" type="text" placeholder="Nombre" />
                  <FormikTextArea my="4" name="description" type="text" placeholder="Descripción" />

                  <Button type="submit" variantColor="green" isLoading={createMissionStatus == LOADING}>
                    Guardar
                  </Button>
                </Form>
              </Formik>
            </Flex>
          )}
        </Flex>
      </Skeleton>
    </>
  );
};

export default MissionsPanel;
