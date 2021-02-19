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
import { Skeleton, Flex, Stack, Button, Text, SimpleGrid } from "@common/ui";
import { LOADING } from "@app/constants";
import { currentUser } from "@features/users/selectors";
import { useDispatch, useSelector } from "react-redux";
import SaveButton from "@common/components/SaveButton";
import CancelButton from "@common/components/CancelButton";
import Modal from "@common/components/Modal";
import { ReactSVG } from "react-svg";
import throphies from "@features/throphies";

const ThropiesModal = ({ isOpen, onClose, selectThropy }) => {
  const handleSelectedThropy = (thropy) => {
    selectThropy(thropy);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} header={"Seleccioná un trofeo"} size={"full"}>
      <SimpleGrid columns={4} spacing="40px" mt="6">
        {throphies.map((thropy, index) => (
          <Flex key={index} justify="center" className="cursor-pointer" onClick={() => handleSelectedThropy(thropy)}>
            <ReactSVG
              src={thropy || ""}
              key={index}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 100px; height: 100px");
              }}
            />
          </Flex>
        ))}
      </SimpleGrid>
    </Modal>
  );
};

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
  const [thropiesModalIsOpen, setThropiesModalIsOpen] = useState(false);
  const [selectedThropy, setSelectedThropy] = useState(null);

  const onMissionSelected = (mission) => {
    setNewMission(false);
    if (selectedMission && mission.id == selectedMission.id) {
      setMission(null);
    } else {
      setMission(mission);
    }
    setSelectedThropy(null);
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
      dispatch(updateMission(selectedMission.id, values)).then((response) => setMission(response.payload.data.data));
    } else {
      dispatch(createMission(values));
    }
    setSelectedThropy(null);
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
    setMission(null);
  };

  useEffect(() => {
    if (createMissionStatus == COMPLETE || updateStatus == COMPLETE || deleteStatus == COMPLETE) {
      dispatch(listMissions());
      setNewMission(false);
      setEditingMission(false);
    }
  }, [createMissionStatus, updateStatus, deleteStatus]);

  const {
    attributes: { isCounselor },
  } = useSelector(currentUser);

  const handleCancel = () => {
    setEditingMission(false);
    setMission(null);
    setNewMission(false);
  };

  return (
    <>
      <ThropiesModal
        isOpen={thropiesModalIsOpen}
        onClose={() => setThropiesModalIsOpen(false)}
        selectThropy={setSelectedThropy}
      />
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
        <Flex mt="4" flexDirection={{ base: "column", md: "row" }}>
          <MissionsList
            missions={missions}
            onSelect={onMissionSelected}
            selectedId={selectedMission ? selectedMission.id : null}
          />
          {!newMission && !editingMission && selectedMission && <MissionDetail mission={selectedMission} />}
          {!newMission && !selectedMission && (
            <Flex flex="1" ml="4" alignItems="center" justifyContent="center">
              <Text fontSize="xl">Selecciona una misión para ver en detalle.</Text>
            </Flex>
          )}
          {(newMission || (editingMission && selectedMission)) && (
            <Flex flex="1" alignSelf="stretch" ml="4" flexDirection="column">
              <Formik
                initialValues={
                  editingMission
                    ? {
                        name: selectedMission.attributes.name,
                        description: selectedMission.attributes.description,
                        thropy: selectedMission.attributes.thropy,
                      }
                    : initialValues
                }
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  if (selectedThropy) values.thropy = selectedThropy;
                  handleSubmit(values);
                }}
                enableReinitialize
              >
                <Form>
                  <Flex flexDirection="column" mb="6">
                    <FormikTextInput my="4" name="name" type="text" placeholder="Nombre" />
                    <FormikTextArea my="4" name="description" type="text" placeholder="Descripción" />
                    <Flex>
                      <Button onClick={() => setThropiesModalIsOpen(true)} mr="10">
                        Agregar trofeo
                      </Button>
                      <ReactSVG
                        src={selectedThropy ? selectedThropy || "" : selectedMission.attributes.thropy || ""}
                        beforeInjection={(svg) => {
                          svg.setAttribute("style", "width: 50px; height: 50px");
                        }}
                      />
                    </Flex>
                  </Flex>

                  <SaveButton mr="2" type="submit" isLoading={createMissionStatus == LOADING} />
                  <CancelButton onClick={handleCancel} />
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
