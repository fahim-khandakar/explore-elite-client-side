import {
  Button,
  CardMedia,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink } from "react-router-dom";

const GuideList = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    // isLoading: isUsersLoading,
    // refetch,
  } = useQuery({
    queryKey: ["usersDetails"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/guide");
      return res.data;
    },
  });
  function createData(photo, name, email, role, id) {
    return { photo, name, email, role, id };
  }

  const rows = users.map((user) =>
    createData(user.photo, user.name, user.email, user.role, user._id)
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                <CardMedia
                  component="img"
                  alt={`Image for ${row.name}`}
                  height="50"
                  sx={{ width: "50px", borderRadius: "10px" }}
                  image={row.photo}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.role}</TableCell>

              <TableCell align="right">
                <Button
                  component={RouterLink}
                  to={`/guideDetails/${row.id}`}
                  variant="contained"
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GuideList;
