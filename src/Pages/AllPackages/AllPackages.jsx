import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../../Hooks/useAxiosPublic";
import { Container, Grid } from "@mui/material";
import OurPackage from "../../Components/OverView/OurPackage/OurPackage";
import SectionTitle from "../../Hooks/SectionTitle/SectionTitle";

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
    <Grid>
      <SectionTitle title={"All Packages"}></SectionTitle>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {!isLoading &&
          allPackages.map((item, index) => (
            <Grid key={index} item xs={12} md={4}>
              <OurPackage item={item}></OurPackage>
            </Grid>
          ))}
      </Container>
    </Grid>
  );
};

export default AllPackages;
