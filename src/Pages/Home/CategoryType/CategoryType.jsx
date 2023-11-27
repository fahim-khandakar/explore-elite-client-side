import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link as RouterLink } from "react-router-dom";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "nature",
    author: "Type : Nature",
  },
  {
    img: "https://images.unsplash.com/photo-1617469165786-8007eda3caa7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "culture",
    author: "Type : Culture",
  },
  {
    img: "https://images.unsplash.com/photo-1496850574977-a4607106a874?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "urban",
    author: "Type : Urban",
  },
  {
    img: "https://images.unsplash.com/photo-1538471726790-0f6b031f1982?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "walking",
    author: "Type : Walking",
  },
  {
    img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "adventure",
    author: "Type : Adventure",
  },
];

const CategoryType = () => {
  return (
    <Box sx={{ height: 570, overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem
            component={RouterLink}
            to={`/type/${item.title}`}
            key={item.img}
          >
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              position="below"
              sx={{ fontWeight: "bold", color: "#e65728" }}
              title={item.author}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default CategoryType;
