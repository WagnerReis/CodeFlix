import { Box, Button, Typography } from "@mui/material";
import { GridFilterModel, GridRenderCellParams } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice";
import { CategoriesTable } from "./components/CategoryTable";

export default function CategoryList() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [rowsPerPage] = useState([10, 25, 50, 100]);
  const [search, setSearch] = useState("");

  const options = { perPage, search, page };

  const { enqueueSnackbar } = useSnackbar();
  const { data, isFetching, error } = useGetCategoriesQuery(options);
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
  const navigate = useNavigate();

  function handleOnPageChange(page: number) {
    setPage(page + 1);
  }

  function handleOnPageSizeChange(perPage: number) {
    setPerPage(perPage);
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if(filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join("");
      setSearch(search);
    } else {
      return setSearch("");
    }

  }

  function handleEditCategory(params: GridRenderCellParams) {
    navigate(`/categories/edit/${params.id}`);
  }

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar(`Category deleted`, { variant: "success" });
    }
    if (deleteCategoryStatus.error) {
      enqueueSnackbar(`Category not deleted`, { variant: "error" });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

  if(error) {
    return <Typography>Error fetching categories</Typography>
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>

      <CategoriesTable
        data={data}
        perPage={perPage}
        isFetching={isFetching}
        rowsPerPage={rowsPerPage}
        handleEdit={handleEditCategory}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  );
}
