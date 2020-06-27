import React from "react";
import PropTypes from "prop-types";

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SlideIn,
} from "@common/ui";

const Modal = ({ header, footer, children, isOpen, onClose, ...props }) => {
  return (
    <SlideIn in={isOpen}>
      {(styles) => (
        <ChakraModal onClose={onClose} isOpen={true} {...props}>
          <ModalOverlay opacity={styles.opacity} />
          <ModalContent pb={5} {...styles}>
            {header && <ModalHeader>{header}</ModalHeader>}
            <ModalCloseButton />
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </ModalContent>
        </ChakraModal>
      )}
    </SlideIn>
  );
};

export default Modal;

Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  props: PropTypes.object,
};
