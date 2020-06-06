import React from "react";
import { Box, Image } from "@common/ui";

const Card = ({ imageUrl, imageAlt = "", title = "", description = "", children, ...props }) => {
  return (
    <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" {...props}>
      {imageUrl && <Image src={imageUrl} alt={imageAlt} />}

      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {title}
      </Box>

      <Box>{description}</Box>

      <Box p="6">{children}</Box>
    </Box>
  );
};

export default Card;
