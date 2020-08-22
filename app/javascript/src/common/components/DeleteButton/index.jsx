import React from "react";
import { Button } from "@common/ui";
import strings from "@common/strings";

const DeleteButton = ({ ...props }) => {
  return (
    <Button rightIcon="delete" variantColor="red" {...props}>
      {strings.delete}
    </Button>
  );
};

export default DeleteButton;
