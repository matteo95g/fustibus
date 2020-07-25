import React from "react";
import { useField } from "formik";

import { FormControl, FormLabel, Input, FormErrorMessage } from "@common/ui";

const FormikTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const isInvalid = meta.touched && meta.error ? true : false;
  return (
    <FormControl isInvalid={isInvalid} {...props}>
      {label && <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>}
      <Input {...field} {...props} m="0" isInvalid={isInvalid} />
      {isInvalid && <FormErrorMessage pb={3}>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormikTextInput;
