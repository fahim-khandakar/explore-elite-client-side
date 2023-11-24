/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";

const SectionTitle = ({ title }) => {
  return (
    <Typography
      textAlign={"center"}
      fontWeight={"700"}
      my={5}
      variant="h3"
      color={"#e65728"}
    >
      -- {title} --
    </Typography>
  );
};

export default SectionTitle;
