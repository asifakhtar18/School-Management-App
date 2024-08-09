import { Box, Typography } from "@mui/material";
import { useApp } from "../context/AppContext";
export default function Home() {
  const { user } = useApp();
  const nameArr = user?.name.split(" ");
  const updatedName = nameArr
    ?.map((name) => name?.charAt(0)?.toUpperCase() + name?.slice(1))
    ?.join(" ");

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", padding: "10px" }}>
        Welcome , {updatedName}!
      </Typography>
    </Box>
  );
}
