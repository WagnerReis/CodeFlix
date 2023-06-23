import { Box, Button, IconButton, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { deleteCategory, selectCategories } from "./categorySlice";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

export default function CategoryList() {
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategories);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const slotProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString("pt-BR"),
  }));

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "id",
      headerName: "Actions",
      type: "string",
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

  function renderNameCell(params: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${params.id}`}
      >
        <Typography color="primary">{params.value}</Typography>
      </Link>
    );
  }

  function handleEditCategory(params: GridRenderCellParams) {
    navigate(`/categories/edit/${params.id}`);
  }

  function handleDeleteCategory(params: GridRenderCellParams) {
    dispatch(deleteCategory(params));
    enqueueSnackbar("Category deleted successfully", { variant: "success"});
  }

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <>
        <IconButton
          color="secondary"
          onClick={() => handleDeleteCategory(params.value)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={() => handleEditCategory(params)}
          aria-label="edit"
          style={{ color: "yellow" }}
        >
          <EditIcon style={{ height: "22px" }} />
        </IconButton>
      </>
    );
  }

  function renderIsActiveCell(params: GridRenderCellParams) {
    return (
      <Typography color={params.value ? "primary" : "secondary"}>
        {params.value ? "Active" : "Inactive"}
      </Typography>
    );
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

      <Box sx={{ display: "flex", height: "60vh" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnFilter
          disableColumnSelector
          slotProps={slotProps}
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          pageSizeOptions={[10, 20, 50, 100]}
        />
      </Box>

      {/* {categories.map((category) => (
        <Typography key={category.id}>{category.name}</Typography>
      ))} */}
    </Box>
  );
}
