import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Category } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export default function CategoryCreate() {
  const [isDisabled, setIsDisabled] = useState(false);

  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    created_at: "",
    updated_at: "",
    description: "",
    deleted_at: null,
    is_active: false,
  });

  const handleChange = (e: any) => {};

  const handleToggle = (e: any) => {};

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={category}
          isDisabled={isDisabled}
          isLoading={false}
          onSubmit={() => {}}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
}
