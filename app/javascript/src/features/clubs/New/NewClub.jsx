import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikTextInput from "@common/components/FormikTextInput";
import FormikSelect from "@common/components/FormikSelect";
import FormikCheckbox from "@common/components/FormikCheckbox";
import AlertWithIcon from "@common/components/AlertWithIcon";
import FileUploader from "@common/components/FileUploader";
import { create } from "@features/clubs/clubsSlice";
import { clubsState } from "@features/clubs/selectors";
import { Button, Box, FormLabel } from "@common/ui";
import { useHistory } from "react-router-dom";
import { REQUIRED, ERROR, COMPLETE } from "@app/constants";
import { useDispatch, useSelector } from "react-redux";

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

const areaOptions = [
  { value: "", label: "Seleccioná un área" },
  { value: 0, label: "Ciencia" },
  { value: 1, label: "Tecnología" },
  { value: 2, label: "Social" },
];

const NewClub = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const status = useSelector((state) => clubsState(state).status);
  const error = useSelector((state) => clubsState(state).error);
  const [clubCreated, setClubCreated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cover, setCover] = useState(null);

  const initialValues = {
    name: "",
    formal: false,
    category: "",
    area: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(REQUIRED),
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

  const handleSubmit = (values) => {
    setTimeout(() => {
      setSubmitting(true);
      if (cover) values.cover = cover;
      dispatch(create(values)).then(() => {
        setClubCreated(true);
        setSubmitting(false);
      });
    }, 400);
  };

  const handleUpload = (files) => {
    setCover(files[0]);
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
              {error}
            </AlertWithIcon>
          )}
          {status === COMPLETE && clubCreated && (
            <AlertWithIcon status="success" variant="left-accent">
              El club ha sido creado con exito!
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
            ¿Es Formal?
          </FormikCheckbox>
          <FormLabel>Imagen</FormLabel>
          <FileUploader handleUpload={handleUpload} multiple={false} uploading={false} />
          <Button mr="4" variantColor="red" onClick={() => history.goBack()}>
            Cancelar
          </Button>
          <Button type="submit" variantColor="green" isLoading={submitting}>
            Crear
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default NewClub;
