import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";

import { update } from "@features/users/usersSlice";
import { Flex, Box, Alert, Heading, Text, Button, Image } from "@common/ui";
import { currentUser } from "@features/users/selectors";
import FormikTextInput from "@common/components/FormikTextInput";
import FormikSelect from "@common/components/FormikSelect";
import kidsResearchImg from "@images/kidsResearch";
import FileUploader from "@common/components/FileUploader";
import { homeUrl } from "@utils/app/urlHelpers";
import { currentUserImage } from "@features/users/selectors";
import emptyProfile from "@images/emptyProfile";
import { fetchUser } from "@features/users/usersSlice";

const Step1 = ({ nextStep }) => {
  return (
    <Box
      maxW="500px"
      mt={-10}
      shadow="lg"
      bg="white"
      px={20}
      py={12}
      textAlign="center"
      backgroundImage={`url(${kidsResearchImg})`}
      backgroundRepeat="no-repeat"
    >
      <Alert status="success" variant="subtle" px={12} mb={8} justifyContent="center" shadow="md">
        ¡Usuario creado con éxito!
      </Alert>
      <Heading as="h2" mb={4}>
        Bienvenido
      </Heading>
      <Text textAlign="justify" mb={8}>
        Gracias por unirte a <strong>Fustibus</strong>. Comienza actualizando tu información
        personal para poder unirte a un <strong>Club de Ciencia!</strong>
      </Text>
      <Button w="100%" variantColor="teal" onClick={nextStep}>
        Siguiente
      </Button>
    </Box>
  );
};

const Step2 = ({ user, nextStep }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    names: Yup.string().required("Debes ingresar tu nombre."),
    lastNames: Yup.string().required("Debes ingresar tu apellido."),
    institution: Yup.string().required("Debes ingresar tu institución."),
    department: Yup.string().required("Debes ingresar tu departamento."),
  });

  const initialValues = {
    names: user?.attributes?.names ?? "",
    lastNames: user?.attributes?.lastNames ?? "",
    institution: user?.attributes?.institution ?? "",
    department: user?.attributes?.department ?? "",
  };

  const departmentsOptions = [
    { value: "", label: "" },
    { value: "Artigas", label: "Artigas" },
    { value: "Canelones", label: "Canelones" },
    { value: "Cerro Largo", label: "Cerro Largo" },
    { value: "Colonia", label: "Colonia" },
    { value: "Durazno", label: "Durazno" },
    { value: "Flores", label: "Flores" },
    { value: "Florida", label: "Florida" },
    { value: "Lavalleja", label: "Lavalleja" },
    { value: "Maldonado", label: "Maldonado" },
    { value: "Montevideo", label: "Montevideo" },
    { value: "Paysandú", label: "Paysandú" },
    { value: "Río Negro", label: "Río Negro" },
    { value: "Rivera", label: "Rivera" },
    { value: "Rocha", label: "Rocha" },
    { value: "Salto", label: "Salto" },
    { value: "San José", label: "San José" },
    { value: "Soriano", label: "Soriano" },
    { value: "Tacuarembó", label: "Tacuarembó" },
    { value: "Treinta y Tres", label: "Treinta y Tres" },
  ];

  const handleSubmit = (values, setSubmitting) => {
    dispatch(update(user.id, values)).then(() => {
      setSubmitting(false);
      nextStep();
    });
  };

  return (
    <Box
      maxW="500px"
      mt={-8}
      shadow="lg"
      bg="white"
      px={20}
      py={12}
      textAlign="center"
      backgroundImage={`url(${kidsResearchImg})`}
      backgroundRepeat="no-repeat"
    >
      <Heading as="h3" mb="6">
        Completa tu información
      </Heading>
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
              mb="4"
              label="Nombre(s)"
              name="names"
              type="text"
              placeholder=""
              shadow="sm"
            />
            <FormikTextInput
              mb="4"
              label="Apellido(s)"
              name="lastNames"
              type="text"
              placeholder=""
              shadow="sm"
            />
            <FormikSelect mb="4" label="Departamento" name="department" shadow="sm">
              {departmentsOptions.map((department, i) => (
                <option key={i} value={department.value}>
                  {department.label}
                </option>
              ))}
            </FormikSelect>
            <FormikTextInput
              mb="8"
              label="Institución"
              name="institution"
              type="text"
              placeholder=""
              shadow="sm"
            />
            <Button w="100%" type="submit" variantColor="teal" isLoading={isSubmitting}>
              Siguiente
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const Step3 = ({ user, nextStep }) => {
  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const imageUrl = useSelector((state) => currentUserImage(state))?.attributes?.file?.url;

  const handleUpload = (files) => {
    setProfileImage(files[0]);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    if (profileImage) {
      dispatch(update(user.id, { profileImage })).then(() => {
        setSubmitting(false);
        nextStep();
      });
    } else {
      nextStep();
    }
  };

  return (
    <Box maxW="500px" mt={-6} shadow="lg" bg="white" px={12} py={12} textAlign="center">
      <Heading as="h3" mb="6">
        Agrega una imagen
      </Heading>
      <Image
        w="100%"
        maxW="200px"
        mx="auto"
        rounded="full"
        src={imageUrl ? imageUrl : emptyProfile}
      />
      <FileUploader
        w="100%"
        maxW="350px"
        handleUpload={handleUpload}
        multiple={false}
        uploading={false}
      />
      <Button w="100%" variantColor="teal" mt="6" isLoading={submitting} onClick={handleSubmit}>
        Finalizar
      </Button>
    </Box>
  );
};

const Welcome = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(currentUser);

  const [currentStep, setCurrentStep] = useState(1);

  const getStepComponent = () => {
    const handleFirstStepSubmit = () => {
      setCurrentStep(2);
    };

    const handleSecondStepSubmit = () => {
      setCurrentStep(3);
    };

    const handleThirdStepSubmit = () => {
      dispatch(fetchUser());
      history.push(homeUrl());
    };

    switch (currentStep) {
      case 1:
        return <Step1 nextStep={handleFirstStepSubmit} />;
      case 2:
        return <Step2 user={user} nextStep={handleSecondStepSubmit} />;
      case 3:
        return <Step3 user={user} nextStep={handleThirdStepSubmit} />;
    }
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg="blue.100">
      {getStepComponent()}
    </Flex>
  );
};

export default Welcome;
