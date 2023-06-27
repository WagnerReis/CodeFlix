import { GridFilterModel } from "@mui/x-data-grid";
import { Results } from "../../../types/Category"

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number;

  handleOnPageChange: (page: number) => void;
  handleFilter: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: number) => void;
}

export function CategoriesTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilter,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {}