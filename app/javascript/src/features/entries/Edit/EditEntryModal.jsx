import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@common/ui";
import { update } from "@features/entries/entriesSlice";
import Modal from "@common/components/Modal";
import PropTypes from "prop-types";
import { REQUIRED, ERROR } from "@app/constants";
import FormikTextInput from "@common/components/FormikTextInput";
import FormikTextArea from "@common/components/FormikTextArea";
import FormikDatePicker from "@common/components/FormikDatePicker";
import { useDispatch } from "react-redux";
import strings from "@common/strings";
import AlertWithIcon from "@common/components/AlertWithIcon";

const NewEntryModal = ({ entry, isOpen, setIsOpen, fieldFolderId }) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    title: entry?.attributes?.title ?? "",
    description: entry?.attributes?.description ?? "",
    date: entry?.attributes?.date ?? "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(REQUIRED),
    description: Yup.string().required(REQUIRED),
  });

  const handleSubmit = (values) => {
    setTimeout(() => {
      setSubmitting(true);
      dispatch(update(fieldFolderId, entry.id, values)).then(() => {
        setSubmitting(false);
        setIsOpen(false);
      });
    }, 400);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} header={strings.Entries.edit.title}>
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
                {strings.Entries.edit.error}
              </AlertWithIcon>
            )}
            <FormikTextInput my="4" label="Titulo" name="title" type="text" placeholder="" />
            <FormikTextArea my="4" label="Descripcion" name="description" type="text" placeholder="" />
            <FormikDatePicker my="4" w="100%" name="date" />

            <Button mr="4" variantColor="red" onClick={() => setIsOpen(false)}>
              {strings.Entries.edit.cancel}
            </Button>
            <Button type="submit" variantColor="green" isLoading={submitting}>
              {strings.Entries.edit.save}
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
