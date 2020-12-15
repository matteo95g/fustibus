import React, { forwardRef, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import { DatePicker } from "@common/ui";
import { Input } from "@common/ui";
import moment from "moment";

export const FormikDatePicker = ({ showTimeInput = false, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  useEffect(() => {
    if (!field.value) setFieldValue(field.name, new Date());
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
      showMonthDropdown
      showYearDropdown
      closeOnScroll
      dropdownMode="select"
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) =>
        setFieldValue(
          field.name,
          moment(val).format(`${showTimeInput ? "YYYY-MM-DD - HH:mm" : "YYYY-MM-DD"}`)
        )
      }
      customInput={<DateInput />}
      showTimeInput={showTimeInput}
    />
  );
};

export default FormikDatePicker;
