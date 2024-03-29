import React from "react";
import { useField } from "formik";

import { FormControl, FormErrorMessage, Checkbox, Switch, Flex, FormLabel } from "@common/ui";

const FormikCheckbox = ({ children, isSwitch = false, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  const isInvalid = meta.touched && meta.error ? true : false;

  return (
    <FormControl isInvalid={isInvalid} {...props}>
      {isSwitch ? (
        <Flex align="center">
          <Switch {...field} {...props} mr="2" isChecked={field.checked} />
          <FormLabel htmlFor={props.id || props.name}>{children}</FormLabel>
        </Flex>
      ) : (
        <Checkbox {...field} {...props} isInvalid={isInvalid} isChecked={field.checked}>
          {children}
        </Checkbox>
      )}
      {isInvalid && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormikCheckbox;
