import React from "react";
import { Flex, Input, Link } from "@common/ui";
import DatePickerInput from "@common/components/DatePickerInput";

const Actions = ({ filters, setFilters, initialFilters }) => {
  console.log(filters);
  return (
    <Flex mt="4" align="center" mb="6">
      <Flex w="50%">
        <Input
          value={filters.content || ""}
          onChange={(e) => setFilters({ content: e.target.value })}
          placeholder="Filtrar por contenido"
        />
        <DatePickerInput selected={filters.date} name={"date"} setDate={setFilters} mx="2" />
      </Flex>
      <Link variantColor="teal" ml="50px" onClick={() => setFilters(initialFilters)}>
        Borrar filtros
      </Link>
    </Flex>
  );
};

export default Actions;
