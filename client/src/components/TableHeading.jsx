import { Box, Typography } from "@mui/material";

import LargeButton from "./buttons/LargeButton";

export default function TableHeading({ onclick, heading, btnName }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", m: "20px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "gray" }}>
        {heading}
      </Typography>
      <LargeButton
        bgClr="#5af2944"
        color="white"
        name={btnName}
        onClick={onclick}
      />
    </Box>
  );
}
