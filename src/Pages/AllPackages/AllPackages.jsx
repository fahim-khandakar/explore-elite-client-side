import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../../Hooks/useAxiosPublic";
import { Container, Grid } from "@mui/material";
import OurPackage from "../../Components/OverView/OurPackage/OurPackage";

const AllPackages = () => {
  const axiosPublic = userAxiosPublic();
  const { data: allPackages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosPublic.get("/packages");
      return res.data;
    },
  });

  if (isLoading) {
    return;
  }
  return (
    <Container
      maxWidth="lg"
      container
      sx={{ display: "flex", justifyContent: "center" }}
    >
      {!isLoading &&
        allPackages.map((item, index) => (
          <Grid key={index} item xs={12} md={4}>
            <OurPackage item={item}></OurPackage>
          </Grid>
        ))}
    </Container>
  );
};

export default AllPackages;
