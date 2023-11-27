import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import userAxiosPublic from "../../Hooks/useAxiosPublic";
import GuideList from "../../Components/GuideList/GuideList";
import SectionTitle from "../../Hooks/SectionTitle/SectionTitle";
import BookingForm from "../../Components/BookingForm/BookingForm";

const PackageDetails = () => {
  const { id } = useParams();
  console.log(id);
  const axiosPublic = userAxiosPublic();
  const { data: packageDetails, isLoading } = useQuery({
    queryKey: ["packageDetails"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/packageDetails/${id}`);
      return res.data;
    },
  });
  if (isLoading) {
    return;
  }
  return (
    <Container maxWidth="lg">
      {!isLoading && (
        <Card sx={{ textAlign: "left", margin: "20px 10px" }}>
          <CardMedia
            component="img"
            height="394"
            image={
              packageDetails && packageDetails?.photoURL
                ? packageDetails.photoURL
                : ""
            }
            alt=""
          />
          <CardContent>
            <Typography
              color={"#e65728"}
              sx={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Tour Type: {packageDetails.type}
            </Typography>
            <Typography
              color={"#e65728"}
              sx={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "4px",
              }}
            >
              Place: {packageDetails.name}
            </Typography>
            <Typography pt={1} variant="body2" color="#666666">
              {packageDetails.details}
            </Typography>
            <Typography pt={3} fontWeight={700} color={"#e65728"} fontSize={25}>
              -- Trip Plan --
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                paddingTop: "15px",
              }}
            >
              <Typography
                px={2}
                borderRadius={1}
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "#e65728",
                }}
              >
                Day 1
              </Typography>
              <ArrowForwardIcon sx={{ margin: "0px 8px" }} />
              <Typography>{packageDetails.day1}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                paddingTop: "15px",
              }}
            >
              <Typography
                px={2}
                borderRadius={1}
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "#e65728",
                }}
              >
                Day 2
              </Typography>
              <ArrowForwardIcon sx={{ margin: "0px 8px" }} />
              <Typography>{packageDetails.day2}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                paddingTop: "15px",
                paddingBottom: "30px",
              }}
            >
              <Typography
                px={2}
                borderRadius={1}
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "#e65728",
                }}
              >
                Day 3
              </Typography>
              <ArrowForwardIcon sx={{ margin: "0px 8px" }} />
              <Typography>{packageDetails.day3}</Typography>
            </Box>
            <Typography color={"#e65728"} fontSize={30} fontWeight={800} mt={3}>
              Price: ${packageDetails.price}
            </Typography>
          </CardContent>
        </Card>
      )}
      <SectionTitle title={"Choose Guide For This Trip"}></SectionTitle>
      <GuideList></GuideList>
      <SectionTitle title={"Booking Form"}></SectionTitle>
      <BookingForm
        price={packageDetails?.price}
        name={packageDetails?.name}
      ></BookingForm>
    </Container>
  );
};

export default PackageDetails;
