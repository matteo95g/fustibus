import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "@features/users/usersSlice";
import { ERROR } from "@app/constants";
import { signupUrl } from "@utils/app/urlHelpers";

import { Box, Flex, Heading, Button, Alert } from "@common/ui";
import FormikTextInput from "@common/components/FormikTextInput";
import { DELAY_TIMEOUT } from "@utils/app/forms";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const validationSchema = Yup.object({
    email: Yup.string().email('El email ingresado es inválido.').required('El email no puede ser vacío.'),
    password: Yup.string().required('La contraseña no puede ser vacía.'),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, setSubmitting) => {
    setTimeout(() => {
      dispatch(login({ user: values })).then(() => {
        setSubmitting(false);
      });
    }, DELAY_TIMEOUT);
  };

  return (
    <Flex p={{ xs: 5, md: 10, xl: 20 }} align="center" justify="center" minH="100vh" bg="blue.100">
      <Box maxW="400px" w="100%" mt={-16} shadow="lg" bg="white" p={{ xs: 6, md: 10 }} textAlign="center">
        <Heading as="h1" mb={6}>Iniciar Sesión</Heading>
        {status === ERROR && <Alert status="error" mb="4">{error}</Alert>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormikTextInput w="100%" mb={3} name="email" placeholder="Email" />
              <FormikTextInput w="100%" mb={3} name="password" placeholder="Password" type="password" />
              <Button w="100%" mb={3} type="submit" variantColor="green" isLoading={isSubmitting}>
                Ingresar
              </Button>
              <Button w="100%" onClick={() => history.push(signupUrl())}>
                Crear usuario
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  )
};

export default Login;
