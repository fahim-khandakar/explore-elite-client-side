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
import { useState } from "react";
import swal from "sweetalert";

const ManageUsers = () => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [storeId, setStoreId] = useState();
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    // isLoading: isUsersLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  function createData(photo, name, email, role, id) {
    return { photo, name, email, role, id };
  }

  const rows = users.map((user) =>
    createData(user.photo, user.name, user.email, user.role, user._id)
  );

  const handleMakeAdmin = (id) => {
    // Your logic for making admin goes here
    const res = axiosSecure.put(`/users/makeAdmin/${id}`);
    res.then((res) => {
      if (res.data.modifiedCount > 0) {
        swal("success", "The user has been updated successfully");

        refetch();
        setButtonsDisabled(true);
        console.log(storeId);
      } else {
        swal("error", "An error has occurred while updating the user", "error");
        setButtonsDisabled(false);
      }
    });
  };

  const handleMakeGuide = (id) => {
    const res = axiosSecure.put(`/users/makeGuide/${id}`);
    res.then((res) => {
      if (res.data.modifiedCount > 0) {
        swal("success", "The user has been updated successfully");
        refetch();
        setStoreId(id);
        setButtonsDisabled(true);
      } else {
        swal("error", "An error has occurred while updating the user", "error");
        setButtonsDisabled(false);
        setStoreId(null);
      }
    });
  };

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
                  variant="contained"
                  onClick={() => handleMakeAdmin(row.id)}
                  disabled={storeId === row.id && buttonsDisabled}
                >
                  Make Admin
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  onClick={() => handleMakeGuide(row.id)}
                  disabled={storeId === row.id && buttonsDisabled}
                >
                  Make Guide
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageUsers;
