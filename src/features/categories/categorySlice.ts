import { createSlice } from "@reduxjs/toolkit";

interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  description: null | string;
  deleted_at: null | string;
}

const category: Category = {
  id: "12312312321312312312",
  name: "Olive",
  description: "Olive the best",
  is_active: true,
  deleted_at: null,
  created_at: "2022-08-15T10:59:09+0000",
  updated_at: "2022-08-15T10:59:09+0000"
}

export const initialState = [
  category,
  { ...category, id: "130812931lkasdlç132091313", name: "Peach" },
  { ...category, id: "1230-9slaksjdkasjdlajdapo", name: "Apple" },
  { ...category, id: "1232131lk1jlk12j3l13kj12l", name: "Banana" }
]

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory(state, action) { },
    editCategory(state, action) { },
    listCategory(state, action) { }
  }
})

export default categoriesSlice.reducer;