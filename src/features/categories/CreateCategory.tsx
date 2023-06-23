import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Category, createCategory } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";
import { useAppDispatch } from "../../app/hooks";
import { useSnackbar } from "notistack";

export default function CategoryCreate() {
  const [isDisabled, setIsDisabled] = useState(false);

  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    created_at: "",
    updated_at: "",
    description: "",
    deleted_at: null,
    is_active: false,
  });

  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createCategory(categoryState));
    enqueueSnackbar("Category created successfully", { variant: "success"});
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({
      ...categoryState,
      [name]: value,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          isLoading={false}
          isDisabled={isDisabled}
          category={categoryState}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
}
