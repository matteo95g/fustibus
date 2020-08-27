import React from "react";
import { Button } from "@common/ui";
import strings from "@common/strings";

const CancelButton = ({ ...props }) => {
  return (
    <Button variantColor="red" {...props}>
      {strings.cancel}
    </Button>
  );
};

export default CancelButton;
