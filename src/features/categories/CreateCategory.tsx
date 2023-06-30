import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Category,
  useCreateCategoryMutation,
} from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";
import { useSnackbar } from "notistack";

export default function CategoryCreate() {
  const [createCategory, createCategoryStatus] = useCreateCategoryMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    created_at: "",
    updated_at: "",
    description: "",
    deleted_at: null,
    is_active: false,
  });


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createCategory(categoryState);
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

  useEffect(() => {
    if (createCategoryStatus.isSuccess) {
      enqueueSnackbar("Category created successfully", { variant: "success" });
      setIsDisabled(true);
    }

    if (createCategoryStatus.error) {
      enqueueSnackbar("Category not created", { variant: "error" });
    }
  }, [enqueueSnackbar, createCategoryStatus]);

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
