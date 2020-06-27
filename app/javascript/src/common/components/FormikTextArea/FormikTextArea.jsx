import React from "react";
import { useField } from "formik";

import { FormControl, FormLabel, FormErrorMessage, Textarea } from "@common/ui";

const FormikTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const isInvalid = meta.touched && meta.error ? true : false;
  return (
    <FormControl isInvalid={isInvalid} {...props}>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Textarea {...field} {...props} m="0" isInvalid={isInvalid} />
      {isInvalid && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormikTextArea;
