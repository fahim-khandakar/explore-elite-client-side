import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  Button,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";

const TouristWishlist = () => {
  const axiosSecure = useAxiosSecure();

  const { user, loading } = useContext(AuthContext);
  const {
    data: wishesData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishesData", user],
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishes/?email=${user?.email}`);
      return res.data;
    },
  });

  function createData(photo, name, type, price, id, wishId) {
    return { photo, name, type, price, id, wishId };
  }

  const uniqueIds = new Set();
  const rows = wishesData
    .filter((wish) => {
      // Check if the ID is already in the set; if it is, filter it out.
      if (uniqueIds.has(wish.id)) {
        return false;
      }

      // Add the ID to the set to keep track of it.
      uniqueIds.add(wish.id);
      return true;
    })
    .map((wish) =>
      createData(
        wish.photoURL,
        wish.name,
        wish.type,
        wish.price,
        wish.id,
        wish._id
      )
    );

  // delete action
  const handleDelete = (wishId) => {
    axiosSecure
      .delete(`/deleteWish/${wishId}`)
      .then((res) => {
        swal("success", `Successfully deleted`, "success");
        console.log(res);
        refetch();
      })
      .catch((err) => {
        swal("Error", `${err.message}`, "error");

        console.log(err.message);
      });
  };

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <HashLoader color="#36d7b7" />
      </Grid>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Helmet>
        <title>Explore Elite | Wish List</title>
      </Helmet>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Action</TableCell>
            <TableCell align="right">Action</TableCell>
            <TableCell align="right">Icon</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                <CardMedia
                  component="img"
                  alt={`Image for ${row.photo}`}
                  height="50"
                  sx={{ width: "50px", borderRadius: "10px" }}
                  image={row.photo}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">${row.price}</TableCell>

              <TableCell align="right">
                <Button
                  component={RouterLink}
                  to={`/packageDetails/${row?.id}`}
                  variant="contained"
                >
                  View Details
                </Button>
              </TableCell>

              <TableCell align="right">
                <Button
                  onClick={() => handleDelete(row.wishId)}
                  variant="contained"
                >
                  Delete
                </Button>
              </TableCell>

              <TableCell align="right">
                <IconButton
                  aria-label="add to favorites"
                  style={{ color: "red" }}
                >
                  <FavoriteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TouristWishlist;
