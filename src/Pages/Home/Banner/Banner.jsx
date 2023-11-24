import { Grid, Stack, Typography } from "@mui/material";

const Banner = () => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={"center"}
      justifyContent={"space-between"}
      spacing={6}
    >
      <Grid width={{ xs: 1, md: 1 / 2 }}>
        <Typography variant="h2">Explore The World</Typography>
      </Grid>
      <Grid width={{ xs: 1, md: 1 / 2 }}>world</Grid>
    </Stack>
  );
};

export default Banner;
