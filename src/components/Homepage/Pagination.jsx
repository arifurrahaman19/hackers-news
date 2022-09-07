import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = (props) => {
  const { pagination } = props.state;
  return (
    <ReactPaginate
      nextLabel=">"
      onPageChange={props.handler}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pagination.pageCount}
      previousLabel="<"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
