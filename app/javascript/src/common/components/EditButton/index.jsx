import React from "react";
import { Button } from "@common/ui";
import strings from "@common/strings";

const EditButton = ({ ...props }) => {
  return (
    <Button rightIcon="edit" variantColor="yellow" {...props}>
      {strings.edit}
    </Button>
  );
};

export default EditButton;
