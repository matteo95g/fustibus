import React from "react";
import { Button, Flex } from "@common/ui";
import Modal from "@common/components/Modal";
import PropTypes from "prop-types";
import strings from "@common/strings";

const ConfirmDeleteModal = ({ isOpen, setIsOpen, onDeleteConfirm, header }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} header={header}>
      <Flex m="6" justify="space-between">
        <Button type="submit" variantColor="teal" onClick={() => setIsOpen(false)}>
          {strings.cancel}
        </Button>
        <Button mr="4" variantColor="red" onClick={onDeleteConfirm}>
          {strings.delete}
        </Button>
      </Flex>
    </Modal>
  );
};

export default ConfirmDeleteModal;

ConfirmDeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  onDeleteConfirm: PropTypes.func,
  header: PropTypes.string,
};
