import React, { useState } from "react";
import Pagination from "react-js-pagination";

const CustomPagination = ({ pagination, handlePageClick }) => {
  const handlePageChange = (pageNumber) => {
    handlePageClick(pageNumber);
  };

  return (
    <div>
      <Pagination
        activePage={pagination.currentPage}
        itemsCountPerPage={pagination.perPage || 20}
        totalItemsCount={pagination.totalEntries || 0}
        pageRangeDisplayed={20}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default CustomPagination;
