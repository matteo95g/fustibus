import React from "react";
import { Button } from "@common/ui";
import strings from "@common/strings";

const SaveButton = ({ ...props }) => {
  return (
    <Button variantColor="green" {...props}>
      {strings.save}
    </Button>
  );
};

export default SaveButton;
