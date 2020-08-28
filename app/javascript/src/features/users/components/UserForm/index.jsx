import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikTextInput from "@common/components/FormikTextInput";
import FormikSelect from "@common/components/FormikSelect";
import FormikTextArea from "@common/components/FormikTextArea";
import FileUploader from "@common/components/FileUploader";
import { usersState } from "@features/users/selectors";
import { useHistory } from "react-router-dom";
import { ERROR, COMPLETE } from "@app/constants";
import { useSelector } from "react-redux";
import { Box, Flex, Image } from "@common/ui";
import CancelButton from "@common/components/CancelButton";
import SaveButton from "@common/components/SaveButton";
import { FormLabel } from "@common/ui";
import FormikDatePicker from "@common/components/FormikDatePicker";
import strings from "@common/strings";
import AlertWithIcon from "@common/components/AlertWithIcon";
import { currentUserImage } from "@features/users/selectors";
import emptyProfile from "@images/emptyProfile";

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

const UserForm = ({ user, handleSubmit, submitting, handleUpload, success }) => {
  const initialValues = {
    email: user?.attributes?.email ?? "",
    names: user?.attributes?.names ?? "",
    lastNames: user?.attributes?.lastNames ?? "",
    birthday: user?.attributes?.birthday ?? "",
    institution: user?.attributes?.institution ?? "",
    aboutMe: user?.attributes?.aboutMe ?? "",
    phone: user?.attributes?.phone ?? "",
    department: user?.attributes?.department ?? "",
  };

  const history = useHistory();
  const status = useSelector((state) => usersState(state).status);
  const error = useSelector((state) => usersState(state).error);
  const imageUrl = useSelector((state) => currentUserImage(state))?.attributes?.file?.url;

  const validationSchema = Yup.object({
    email: Yup.string(),
    names: Yup.string(),
    lastNames: Yup.string(),
    birthday: Yup.date(),
    institution: Yup.string(),
    aboutMe: Yup.string(),
    phone: Yup.string(),
    department: Yup.string(),
  });

  return (
    <Flex justify="space-between">
      <Flex w="35%" alignItems="center" flexDirection="column" mr={10}>
        <Image size="350px" mt="20" rounded="full" src={imageUrl ? imageUrl : emptyProfile} />
        <FileUploader w="350px" handleUpload={handleUpload} multiple={false} uploading={false} />
      </Flex>
      <Box w="65%" m="10">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
        >
          <Form>
            {status === ERROR && (
              <AlertWithIcon status="error" variant="left-accent">
                {error}
              </AlertWithIcon>
            )}
            {status === COMPLETE && success && (
              <AlertWithIcon status="success" variant="left-accent">
                {strings.Users.edit.success}
              </AlertWithIcon>
            )}
            <FormikTextInput my="4" label="Nombre(s)" name="names" type="text" placeholder="" />
            <FormikTextInput my="4" label="Apellido(s)" name="lastNames" type="text" placeholder="" />
            <FormLabel>Fecha de Nacimiento</FormLabel>
            <FormikDatePicker w="100%" name="birthday" />
            <FormikTextInput my="4" label="Institución" name="institution" type="text" placeholder="" />
            <FormikTextInput my="4" label="Telefono / Celular" name="phone" type="text" placeholder="" />
            <FormikSelect my="4" label="Departamento" name="department">
              {departmentsOptions.map((department, i) => (
                <option key={i} value={department.value}>
                  {department.label}
                </option>
              ))}
            </FormikSelect>
            <FormikTextArea my="4" label="Acerca de mi" name="aboutMe" type="text" placeholder="" />
            <CancelButton mr="2" onClick={() => history.goBack()} />
            <SaveButton type="submit" ml="2" isSubmitting={submitting} />
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
};

export default UserForm;
