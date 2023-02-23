import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

function Pagination({onChangePage}) {
  const handlePageClick = (event) => {
    onChangePage(event.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={3}
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Pagination;
