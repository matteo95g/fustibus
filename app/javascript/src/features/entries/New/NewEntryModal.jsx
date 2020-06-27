import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@common/ui";
import { create } from "@features/entries/entriesSlice";
import Modal from "@common/components/Modal";
import PropTypes from "prop-types";
import { REQUIRED, ERROR, COMPLETE } from "@app/constants";
import FormikTextInput from "@common/components/FormikTextInput";
import FormikTextArea from "@common/components/FormikTextArea";
import FormikDatePicker from "@common/components/FormikDatePicker";
import { useDispatch } from "react-redux";

const NewEntryModal = ({ isOpen, setIsOpen, fieldFolderId }) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [entryCreated, setEntryCreated] = useState(false);

  const initialValues = {
    title: "",
    description: "",
    date: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(REQUIRED),
    description: Yup.string().required(REQUIRED),
  });

  const handleSubmit = (values) => {
    setTimeout(() => {
      setSubmitting(true);
      dispatch(create(fieldFolderId, values)).then(() => {
        setEntryCreated(true);
        setSubmitting(false);
        setIsOpen(false);
      });
    }, 400);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} header="Nueva entrada">
      <Box m="6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          <Form>
            {status === ERROR && (
              <AlertWithIcon status="error" variant="left-accent">
                {error}
              </AlertWithIcon>
            )}
            {status === COMPLETE && entryCreated && (
              <AlertWithIcon status="success" variant="left-accent">
                La entrada ha sido creada con exito!
              </AlertWithIcon>
            )}
            <FormikTextInput my="4" label="Titulo" name="title" type="text" placeholder="" />
            <FormikTextArea my="4" label="Descripcion" name="description" type="text" placeholder="" />
            <FormikDatePicker my="4" w="100%" name="date" />

            <Button mr="4" variantColor="red" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" variantColor="green" isLoading={submitting}>
              Crear
            </Button>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default NewEntryModal;

NewEntryModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
