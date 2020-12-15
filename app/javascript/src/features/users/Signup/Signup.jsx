import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { signup } from "@features/users/usersSlice";
import { ERROR } from "@app/constants";
import { loginUrl, welcomeUrl } from "@utils/app/urlHelpers";

import { Box, Flex, Heading, Button, Alert } from "@common/ui";
import FormikTextInput from "@common/components/FormikTextInput";
import { DELAY_TIMEOUT } from "@utils/app/forms";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const urlParams = new URLSearchParams(window.location.search);
  const invitedEmail = urlParams.get("invited_email");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("El email ingresado es inválido.")
      .required("El email no puede ser vacío."),
    password: Yup.string().required("La contraseña no puede ser vacía."),
    passwordConfirmation: Yup.string()
      .required("La confirmación de contraseña no coincide.")
      .oneOf([Yup.ref("password"), null], "La confirmación de contraseña no coincide."),
  });

  const initialValues = {
    email: invitedEmail || "",
    password: "",
    passwordConfirmation: "",
  };

  const handleSubmit = (values, setSubmitting) => {
    setTimeout(() => {
      dispatch(signup({ user: values })).then(() => {
        setSubmitting(false);
        history.push(welcomeUrl());
      });
    }, DELAY_TIMEOUT);
  };

  return (
    <Flex p={{ xs: 5, md: 10, xl: 20 }} align="center" justify="center" minH="100vh" bg="blue.100">
      <Box
        maxW="400px"
        w="100%"
        mt={-16}
        shadow="lg"
        bg="white"
        p={{ xs: 6, md: 10 }}
        textAlign="center"
      >
        <Heading as="h1" mb={6}>
          Nuevo Usuario
        </Heading>
        {status === ERROR && (
          <Alert status="error" mb="4">
            {error}
          </Alert>
        )}
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
                w="100%"
                mb={3}
                name="email"
                placeholder="Email"
                disabled={invitedEmail}
              />
              <FormikTextInput
                w="100%"
                mb={3}
                name="password"
                placeholder="Contraseña"
                type="password"
              />
              <FormikTextInput
                w="100%"
                mb={3}
                name="passwordConfirmation"
                placeholder="Confirmación de contraseña"
                type="password"
              />
              <Button w="100%" mb={3} type="submit" variantColor="green" isLoading={isSubmitting}>
                Registrar
              </Button>
              <Button w="100%" onClick={() => history.push(loginUrl())}>
                Iniciar Sesión
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Signup;
