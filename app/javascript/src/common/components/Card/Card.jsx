import React from "react";
import { PseudoBox, Box, Image, Text, Divider } from "@common/ui";

const Card = ({ imageUrl, imageAlt = "", title = "", description = "", children, ...props }) => {
  return (
    <PseudoBox _hover={{ bg: "blue.50" }} maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" {...props}>
      {imageUrl && <Image src={imageUrl} alt={imageAlt} />}

      <Text m="2" fontSize="lg" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {title}
      </Text>
      <Divider mx="2" />
      <Text m="2" fontSize="sm">
        {description}
      </Text>

      <Box p="6">{children}</Box>
    </PseudoBox>
  );
};

export default Card;
