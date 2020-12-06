import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikTextInput from "@common/components/FormikTextInput";
import FormikSelect from "@common/components/FormikSelect";
import FormikCheckbox from "@common/components/FormikCheckbox";
import FormikTextArea from "@common/components/FormikTextArea";
import AlertWithIcon from "@common/components/AlertWithIcon";
import FileUploader from "@common/components/FileUploader";
import { clubsState } from "@features/clubs/selectors";
import { Button, FormLabel } from "@common/ui";
import { useHistory } from "react-router-dom";
import { REQUIRED, ERROR, COMPLETE } from "@app/constants";
import { useSelector } from "react-redux";

const categoryOptions = [
  { value: "", label: "Seleccioná una categoría" },
  { value: 0, label: "Abejitas" },
  { value: 1, label: "Colibrí" },
  { value: 2, label: "Cardenal" },
  { value: 3, label: "Churrinche" },
  { value: 4, label: "Chajá" },
  { value: 5, label: "Ñandú" },
  { value: 6, label: "Tero" },
  { value: 7, label: "Hornero" },
];

const categoriesOption = [
  { value: 0, label: "abejitas" },
  { value: 1, label: "colibri" },
  { value: 2, label: "cardenal" },
  { value: 3, label: "churrinche" },
  { value: 4, label: "chaja" },
  { value: 5, label: "nandu" },
  { value: 6, label: "tero" },
  { value: 7, label: "hornero" },
];

const areasOption = [
  { value: 0, label: "science" },
  { value: 1, label: "technology" },
  { value: 2, label: "social" },
];

const areaOptions = [
  { value: "", label: "Seleccioná un área" },
  { value: 0, label: "Ciencia" },
  { value: 1, label: "Tecnología" },
  { value: 2, label: "Social" },
];

const ClubForm = ({ club = null, handleUpload, handleSubmit, submitting, actionCompleted }) => {
  const initialValues = {
    name: club?.attributes?.name ?? "",
    description: club?.attributes?.description ?? "",
    formal: club?.attributes?.formal ?? false,
    category:
      categoriesOption.find((category) => category.label === club?.attributes?.category)?.value ??
      "",
    area: areasOption.find((area) => area.label === club?.attributes?.area)?.value ?? "",
  };

  const history = useHistory();
  const status = useSelector((state) => clubsState(state).status);
  const error = useSelector((state) => clubsState(state).error);

  const validationSchema = Yup.object({
    name: Yup.string().required(REQUIRED),
    description: Yup.string()
      .required(REQUIRED)
      .matches(/^.{12,}$/, "Debe contener al menos 12 caracteres"),
    formal: Yup.boolean().required(REQUIRED).oneOf([true, false]),
    category: Yup.number()
      .oneOf(
        categoryOptions.map((category) => category.value),
        "Categoría inválida"
      )
      .required(REQUIRED),
    area: Yup.number()
      .oneOf(
        areaOptions.map((area) => area.value),
        "Área inválida"
      )
      .required(REQUIRED),
  });

  return (
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
        {status === COMPLETE && actionCompleted && (
          <AlertWithIcon status="success" variant="left-accent">
            {`El club ha sido ${club ? "editado" : "creado"} con exito!`}
          </AlertWithIcon>
        )}
        <FormikTextInput my="4" label="Nombre" name="name" type="text" placeholder="" />
        <FormikSelect my="4" label="Categoría" name="category">
          {categoryOptions.map((category, i) => (
            <option key={i} value={category.value}>
              {category.label}
            </option>
          ))}
        </FormikSelect>
        <FormikSelect my="4" label="Área" name="area">
          {areaOptions.map((area, i) => (
            <option key={i} value={area.value}>
              {area.label}
            </option>
          ))}
        </FormikSelect>
        <FormikCheckbox my="4" isSwitch={true} name="formal">
          ¿Es de educación formal?
        </FormikCheckbox>
        <FormikTextArea
          mt="4"
          mb="6"
          label="Descripción"
          name="description"
          type="text"
          placeholder=""
        />
        <FormLabel>Imagen</FormLabel>
        <FileUploader handleUpload={handleUpload} multiple={false} uploading={false} />
        <Button mr="4" variantColor="red" onClick={() => history.goBack()}>
          Cancelar
        </Button>
        <Button type="submit" variantColor="green" isLoading={submitting}>
          {club ? "Guardar" : "Crear"}
        </Button>
      </Form>
    </Formik>
  );
};

export default ClubForm;
