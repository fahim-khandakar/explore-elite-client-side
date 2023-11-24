/* eslint-disable react/no-unescaped-entities */
import { Grid, Typography } from "@mui/material";

const OverView = () => {
  return (
    <Grid>
      <Typography
        sx={{
          textAlign: "center",
          color: "#e65728",
          variant: "h4",
          fontWeight: 600,
          my: [3, 4, 5],
          fontSize: ["1.2rem", "1.5rem", "2rem"], // Responsive font size
        }}
      >
        Explore Elite: Your Gateway to Extraordinary Journeys
      </Typography>
      <Grid
        container
        alignItems={"center"}
        direction={{ sm: "column", md: "row" }}
      >
        <Grid textAlign={"left"} width={{ xs: 1, md: 1 / 2 }}>
          <Grid color={"#666666"}>
            <Typography mt={2}>
              Welcome to Explore Elite, your premier destination for exceptional
              travel experiences. Our platform is designed to redefine your
              notion of exploration, offering expertly crafted itineraries,
              personalized travel guidance, and a commitment to making each
              journey truly unforgettable.
            </Typography>
            <Typography mt={2}>
              As a testament to our dedication to unique adventures, we are
              thrilled to announce our next curated tour to the stunning
              destination of Rangamati, Bangladesh. Nestled in the heart of the
              Chittagong Hill Tracts, Rangamati beckons with its captivating
              landscapes and rich cultural tapestry. With Explore Elite, you can
              trust our seasoned travel guides to lead you through the hidden
              gems and local wonders of this enchanting region.
            </Typography>
            <Typography mt={2}>
              Join us on this upcoming expedition to Rangamati, where every
              moment is an opportunity to explore, learn, and connect. At
              Explore Elite, we believe that travel is not just about reaching a
              destination; it's about the stories you collect along the way. Let
              us be your companion on this extraordinary journey.
            </Typography>
            <Typography mt={2}>
              Discover Rangamati with Explore Elite – because every adventure
              should be exceptional.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sx={{ width: "100%", textAlign: "center" }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/MOh4bZuzcCc?si=_0SIIbQ6Fd5eS1wF"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OverView;
