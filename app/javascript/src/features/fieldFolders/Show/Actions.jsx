import React, { useReducer } from "react";
import { Button, Flex, Input } from "@common/ui";
import DatePickerInput from "@common/components/DatePickerInput";

const Actions = ({ setIsOpen, filters, setFilters, initialFilters }) => {
  return (
    <Flex my="6" justify="space-between">
      <Flex w="50%">
        <Input mr="2" onChange={(e) => setFilters({ content: e.target.value })} placeholder="Filtrar por contenido" />
        <DatePickerInput selected={filters.date} name={"date"} setDate={setFilters} mx="2" />
        <Button variantColor="teal" variant="link" ml="50px" onClick={() => setFilters(initialFilters)}>
          Borrar filtros
        </Button>
      </Flex>
      <Button rightIcon="plus-square" variantColor="green" onClick={() => setIsOpen(true)}>
        Crear Entrada
      </Button>
    </Flex>
  );
};

export default Actions;
