/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link as RouterLink } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import userAxiosPublic from "../../Hooks/useAxiosPublic";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const BookingForm = ({ price, name }) => {
  const [open, setOpen] = useState(false);
  const packageName = name;

  const { user } = useContext(AuthContext);
  const [type, setType] = useState("");
  const axiosPublic = userAxiosPublic();
  const [startDate, setStartDate] = useState(new Date());
  const {
    data: users = [],
    isLoading: isUsersLoading,
    // refetch,
  } = useQuery({
    queryKey: ["usersForBooking", price],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/guide");
      return res.data;
    },
  });
  if (isUsersLoading) {
    return;
  }
  const handleSubmit = () => {
    const form = document.getElementById("bookingForm");
    console.log("submitted");
    // const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const price = form.price.value;
    const email = form.email.value;
    const date = startDate;
    const guide = type;
    const status = "review";
    const bookingInfo = {
      packageName,

      name,
      photo,
      email,
      price,
      guide,
      date,
      status,
    };

    const res = axiosPublic.post("/addBooking", bookingInfo);
    res
      .then((res) => {
        swal("Success!", "You Are Successfully Booked", "success");

        form.reset();
        console.log(res.data);
      })
      .catch((err) => {
        swal("Error!", `${err.message}`, "error");
        console.log(err);
      });
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  // for modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid sx={{ width: "50%", margin: "auto" }}>
      {user && (
        <Grid>
          <form id="bookingForm" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={user?.displayName}
            />

            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              value={user?.email}
              required
            />

            <TextField
              label="PhotoURL"
              name="photo"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user?.photoURL}
              type="text"
              required
            />

            <TextField
              sx={{ marginBottom: "15px" }}
              label="Price"
              disabled
              name="price"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={price}
              required
            />

            <label style={{ margin: "0px 10px 0px 0px" }}>Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />

            <FormControl sx={{ marginTop: "15px" }} fullWidth>
              <InputLabel id="select-label">Select a guide</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={type}
                label="Select an Option"
                onChange={handleChange}
              >
                {users.map((user, index) => (
                  <MenuItem key={index} value={user}>
                    {user?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {user ? (
              <Button
                onClick={handleOpen}
                // type="submit"
                sx={{ marginTop: "30px" }}
                variant="contained"
                color="primary"
              >
                Booking Now
              </Button>
            ) : (
              <Button
                disabled
                // type="submit"
                sx={{ marginTop: "30px" }}
                variant="contained"
                color="primary"
              >
                Booking Confirm
              </Button>
            )}
          </form>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title">Trip: {name}</h2>
              <p id="parent-modal-description">Please Confirm Your Booking</p>
              <Grid display={"flex"} justifyContent={"space-around"}>
                <Button
                  type="submit"
                  sx={{ marginTop: "30px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleSubmit();
                    handleClose();
                  }}
                >
                  Booking Confirm
                </Button>
                <Button
                  sx={{ marginTop: "30px" }}
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to={"/dashboard/touristBookings"}
                >
                  Booking List
                </Button>
              </Grid>
            </Box>
          </Modal>
        </Grid>
      )}
    </Grid>
  );
};

export default BookingForm;
