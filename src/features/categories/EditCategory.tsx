import {
  Box,
  Paper,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Category, selectCategoryById } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export default function CategoryEdit() {
  const id = useParams().id || "";
  const [isDisabled, setIsDisabled] = useState(false);

  const category: Category = useAppSelector((state) => selectCategoryById(state, id));

  const handleChange = (e: any) => {};

  const handleToggle = (e: any) => {};

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
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
