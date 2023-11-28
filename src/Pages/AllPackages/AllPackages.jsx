import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../../Hooks/useAxiosPublic";
import { Container, Grid } from "@mui/material";
import OurPackage from "../../Components/OverView/OurPackage/OurPackage";
import SectionTitle from "../../Hooks/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";

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
    return (
      <Grid container justifyContent="center" alignItems="center">
        <HashLoader color="#36d7b7" />
      </Grid>
    );
  }

  return (
    <Grid>
      <Helmet>
        <title>Explore Elite | Packages</title>
      </Helmet>
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
