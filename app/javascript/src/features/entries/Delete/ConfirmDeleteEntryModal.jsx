import React from "react";
import { Button, Flex } from "@common/ui";
import Modal from "@common/components/Modal";
import PropTypes from "prop-types";
import strings from "@common/strings";

const ConfirmDeleteEntryModal = ({ isOpen, setIsOpen, onDeleteConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} header={strings.Entries.delete.title}>
      <Flex m="6" justify="space-between">
        <Button mr="4" variantColor="red" onClick={onDeleteConfirm}>
          {strings.Entries.delete.delete}
        </Button>
        <Button type="submit" variantColor="teal" onClick={() => setIsOpen(false)}>
          {strings.Entries.delete.cancel}
        </Button>
      </Flex>
    </Modal>
  );
};

export default ConfirmDeleteEntryModal;

ConfirmDeleteEntryModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  handleDeleteEntry: PropTypes.func,
};
