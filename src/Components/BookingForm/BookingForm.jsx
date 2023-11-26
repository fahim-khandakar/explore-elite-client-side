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

import "react-datepicker/dist/react-datepicker.css";
import userAxiosPublic from "../../Hooks/useAxiosPublic";

const BookingForm = ({ price }) => {
  const { user } = useContext(AuthContext);
  const [type, setType] = useState("");
  const axiosPublic = userAxiosPublic();
  const [startDate, setStartDate] = useState(new Date());
  const {
    data: users = [],
    isLoading: isUsersLoading,
    // refetch,
  } = useQuery({
    queryKey: ["usersForBooking"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/guide");
      return res.data;
    },
  });
  if (isUsersLoading) {
    return;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const price = form.price.value;
    const email = form.email.value;
    const date = startDate;
    const guide = type;
    const role = "review";
    const bookingInfo = { name, photo, email, price, guide, date, role };

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
  return (
    <Grid sx={{ width: "50%", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
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
              <MenuItem key={index} value={user?.email}>
                {user?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          sx={{ marginTop: "30px" }}
          variant="contained"
          color="primary"
        >
          Booking Confirm
        </Button>
      </form>
    </Grid>
  );
};

export default BookingForm;
