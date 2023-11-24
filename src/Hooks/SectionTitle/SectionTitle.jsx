/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";

const SectionTitle = ({ title }) => {
  return (
    <Typography
      sx={{
        textAlign: "center",
        fontWeight: 700,
        my: [3, 4, 5],
        fontSize: ["1.5rem", "2rem", "2.5rem"],
        color: "#e65728",
      }}
      variant="h3"
    >
      -- {title} --
    </Typography>
  );
};

export default SectionTitle;
