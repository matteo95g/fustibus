import React, { forwardRef, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import { Input } from "@common/ui";
import moment from "moment";

export const FormikDatePicker = ({ showTimeInput = false, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  useEffect(() => {
    setFieldValue(field.name, new Date());
  }, []);

  const DateInput = forwardRef(({ value, onClick }, _ref) => (
    <Input
      {...props}
      w="100%"
      onClick={onClick}
      value={moment(value).format(`${showTimeInput ? "DD/MM/YYYY - HH:mm" : "DD/MM/YYYY"}`)}
      readOnly
    />
  ));

  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => setFieldValue(field.name, val)}
      customInput={<DateInput />}
      showTimeInput={showTimeInput}
    />
  );
};

export default FormikDatePicker;
