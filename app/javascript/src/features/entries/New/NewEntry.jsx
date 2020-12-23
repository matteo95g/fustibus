import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@common/ui";
import { create } from "@features/entries/entriesSlice";
import PropTypes from "prop-types";
import { REQUIRED, ERROR } from "@app/constants";
import FormikTextInput from "@common/components/FormikTextInput";
import FormikTextArea from "@common/components/FormikTextArea";
import FormikDatePicker from "@common/components/FormikDatePicker";
import { useDispatch, useSelector } from "react-redux";
import strings from "@common/strings";
import AlertWithIcon from "@common/components/AlertWithIcon";
import { useHistory } from "react-router-dom";
import { currentFieldFolder } from "@features/fieldFolders/selectors";

const NewEntry = () => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const fieldFolderId = useSelector((state) => currentFieldFolder(state)?.id);

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
        setSubmitting(false);
        history.goBack();
      });
    }, 400);
  };

  return (
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
              {strings.Entries.new.error}
            </AlertWithIcon>
          )}
          <FormikTextInput my="4" label="Titulo" name="title" type="text" placeholder="" />
          <FormikTextArea my="4" label="Descripcion" name="description" type="text" placeholder="" />
          <FormikDatePicker my="4" w="100%" name="date" />

          <Button mr="4" variantColor="red" onClick={() => history.goBack()}>
            {strings.Entries.new.cancel}
          </Button>
          <Button type="submit" variantColor="green" isLoading={submitting}>
            {strings.Entries.new.create}
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default NewEntry;

NewEntry.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
