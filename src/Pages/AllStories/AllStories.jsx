import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import userAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";

const AllStories = () => {
  const axiosPublic = userAxiosPublic();
  const { data: allStories = [], isLoading } = useQuery({
    queryKey: ["allStories"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allStory`);
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
  console.log(allStories);
  return (
    <Container maxWidth={"lg"}>
      <Helmet>
        <title>Explore Elite | Stories</title>
      </Helmet>
      <Grid container spacing={2}>
        {!isLoading &&
          allStories.map((data, index) => (
            <Grid item my={2} xs={12} lg={12} key={index}>
              <Card
                sx={{ textDecoration: "none" }}
                component={RouterLink}
                to={`/storyDetails/${data._id}`}
              >
                <CardHeader
                  avatar={
                    <Avatar src={data.photo} aria-label="recipe"></Avatar>
                  }
                  title={data.userName}
                  subheader={format(new Date(data.startDate), "yyyy-MM-dd")}
                />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {data.story.slice(0, 180)}...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default AllStories;
