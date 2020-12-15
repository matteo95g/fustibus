import React from "react";
import { useField } from "formik";

import { FormControl, FormLabel, FormErrorMessage, Select } from "@common/ui";

const FormikSelect = ({ label, shadow, ...props }) => {
  const [field, meta] = useField(props);
  const isInvalid = meta.touched && meta.error ? true : false;
  return (
    <FormControl isInvalid={isInvalid} {...props}>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Select {...field} {...props} m="0" isInvalid={isInvalid} shadow={shadow} />
      {isInvalid && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormikSelect;
