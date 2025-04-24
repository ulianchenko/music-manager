import React from "react";
import {
  Pagination as MuiPagination,
  Stack,
  PaginationItem,
} from "@mui/material";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <Stack spacing={2} alignItems="center" mt={4}>
      <MuiPagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onPageChange(value)}
        color="primary"
        data-testid="pagination"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            data-testid={
              item.type === "next"
                ? "pagination-next"
                : item.type === "previous"
                ? "pagination-prev"
                : undefined
            }
          />
        )}
      />
    </Stack>
  );
};

export default Pagination;
