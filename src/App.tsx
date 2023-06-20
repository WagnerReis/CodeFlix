import * as React from "react";
import { Box, ThemeProvider, Typography } from "@mui/material";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { appTheme } from "./config/theme";
import { Route, Routes } from "react-router-dom";

const Home = () => {
  return (
    <Box>
      <Typography variant="h1" component="h1">
        Hello
      </Typography>
    </Box>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Box
        component="main"
        sx={{
          height: "100vh",
          backgroundColor: (theme) => theme.palette.grey[900],
        }}
      >
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}
