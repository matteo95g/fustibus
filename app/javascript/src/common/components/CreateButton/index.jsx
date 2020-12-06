import React from "react";
import { Button } from "@common/ui";
import strings from "@common/strings";

const CreateButton = ({ ...props }) => {
  return (
    <Button rightIcon="plus-square" variantColor="green" {...props}>
      {props.label || strings.create}
    </Button>
  );
};

export default CreateButton;
