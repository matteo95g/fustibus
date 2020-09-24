import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import strings from "@common/strings";
import { Box, Alert, Button } from "@common/ui";
import FormikTextInput from "@common/components/FormikTextInput";
import Modal from "@common/components/Modal";
import invitationsApi from "@features/invitations/api";
import { DELAY_TIMEOUT } from "@utils/app/forms";

const InviteUsers = ({ clubId, ...props }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = (values, setSubmitting) => {
    setTimeout(() => {
      values.emails = values.emails.split(/[\s,]+/);

      setStatus(null);

      invitationsApi
        .invite({ ...values, clubId })
        .then(() => setStatus("success"))
        .catch(() => setStatus("error"))
        .finally(setSubmitting(false));
    }, DELAY_TIMEOUT);
  };

  const validationSchema = Yup.object({
    emails: Yup.array()
      .transform((_, originalValue) => (originalValue ? originalValue.split(/[\s,]+/) : []))
      .of(Yup.string().email(strings.Invitations.addUsers.form.emails.invalid))
      .required(strings.Invitations.addUsers.form.emails.required),
  });

  const initialValues = { emails: "" };

  const onCloseModal = () => {
    setModalOpened(false);
    setStatus(null);
  };

  return (
    <>
      <Button
        rightIcon="small-add"
        variantColor="blue"
        onClick={() => setModalOpened(true)}
        {...props}
      >
        {strings.inviteUsers}
      </Button>

      <Modal
        isOpen={modalOpened}
        onClose={onCloseModal}
        header={strings.Invitations.addUsers.title}
      >
        {status !== null && (
          <Alert mb="3" status={status}>
            {strings.Invitations.addUsers[status]}
          </Alert>
        )}

        <Box mb="4">{strings.Invitations.addUsers.description}</Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormikTextInput
                name="emails"
                mb="4"
                placeholder={strings.Invitations.addUsers.form.emails.placeholder}
              />
              <Button w="100%" mb={3} type="submit" variantColor="green" isLoading={isSubmitting}>
                Ingresar
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default InviteUsers;
