import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import userAxiosPublic from "../../Hooks/useAxiosPublic";
import ShareIcon from "@mui/icons-material/Share";
import { Link as RouterLink } from "react-router-dom";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { format, isValid } from "date-fns";
import { FacebookShareButton } from "react-share";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";

const StoryDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosPublic = userAxiosPublic();
  const { data: storyDetails = [], isLoading } = useQuery({
    queryKey: ["storyDetails"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/storyDetails/${id}`);
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

  const shareUrl = `http://localhost:5173/storyDetails/${id}`;
  const startDate = storyDetails?.startDate;
  const formattedDate = isValid(new Date(startDate))
    ? format(new Date(startDate), "yyyy-MM-dd")
    : "Invalid Date";

  return (
    <Grid item xs={12} lg={6} maxWidth={"lg"} marginX={"auto"} my={5}>
      <Helmet>
        <title>Explore Elite | Home</title>
      </Helmet>
      {!isLoading && storyDetails && (
        <Card sx={{ textDecoration: "none" }}>
          <CardHeader
            avatar={
              <Avatar src={storyDetails?.photo} aria-label="recipe"></Avatar>
            }
            title={storyDetails?.userName}
            subheader={formattedDate}
          />

          <CardContent>
            <Typography color={"#e65728"} fontWeight={700} mb={2}>
              {storyDetails.place}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {storyDetails?.story}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <FacebookShareButton
              title={user ? "" : "Please login first"}
              disabled={user ? false : true}
              url={shareUrl}
            >
              {/* No need for an additional IconButton */}
              <ShareIcon aria-label="share" />
            </FacebookShareButton>
          </CardActions>
        </Card>
      )}

      <Grid display={"flex"} mt={5} justifyContent={"center"}>
        <Button
          component={RouterLink}
          to={`/blogs`}
          variant="contained"
          sx={{ backgroundColor: "#e65728", color: "#ffffff" }}
        >
          All Stories
        </Button>
      </Grid>
    </Grid>
  );
};

export default StoryDetails;
