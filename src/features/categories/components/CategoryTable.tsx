import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Results } from "../../../types/Category";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory } from "../categorySlice";

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number;

  handleOnPageChange: (page: number) => void;
  handleFilter: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};

export function CategoriesTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilter,
  handleOnPageSizeChange,
  handleDelete,
  handleEdit,
}: Props) {
  const navigate = useNavigate();

  const componentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

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

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <>
        <IconButton
          color="secondary"
          onClick={() => handleDelete(params.value)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={() => handleEdit(params.value)}
          aria-label="edit"
          style={{ color: "yellow" }}
        >
          <EditIcon style={{ height: "22px" }} />
        </IconButton>
      </>
    );
  }

  function mapDataToGridRows(data: Results) {
    const { data: categories } = data;
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      isActive: category.is_active,
      createdAt: new Date(category.created_at).toLocaleDateString("pt-BR"),
    }));
  }

  function renderIsActiveCell(params: GridRenderCellParams) {
    return (
      <Typography color={params.value ? "primary" : "secondary"}>
        {params.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

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

  const rows = data ? mapDataToGridRows(data) : [];
  const rowCount = data?.meta.total || 0;

  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        disableColumnFilter
        loading={isFetching}
        filterMode={"server"}
        disableColumnSelector
        pageSize={rowsPerPage}
        paginationMode={"server"}
        componentsProps={componentsProps}
        onPageChange={handleOnPageChange}
        components={{ Toolbar: GridToolbar }}
        onPageSizeChange={handleOnPageSizeChange}
        checkboxSelection={false}
      />
    </Box>
  );
}
