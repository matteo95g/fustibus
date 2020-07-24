import React, { forwardRef, useState } from "react";
import { DatePicker } from "@common/ui";
import { Input } from "@common/ui";
import moment from "moment";

export const DatePickerInput = ({ showTimeInput = false, setDate, selected, name, ...props }) => {
  const DateInput = forwardRef(({ value, onClick }, _ref) => (
    <Input
      placeholder="Fecha"
      {...props}
      w="100%"
      onClick={onClick}
      value={value ? moment(value).format("DD/MM/YYYY") : ""}
      readOnly
    />
  ));

  return <DatePicker selected={selected} onChange={(date) => setDate({ [name]: date })} customInput={<DateInput />} />;
};

export default DatePickerInput;
