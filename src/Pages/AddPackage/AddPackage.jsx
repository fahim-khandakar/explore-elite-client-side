import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import swal from "sweetalert";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Hooks/SectionTitle/SectionTitle";

const AddPackage = () => {
  const axiosSecure = useAxiosSecure();
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const day1 = form.day1.value;
    const day2 = form.day2.value;
    const day3 = form.day3.value;
    const details = form.details.value;
    const price = form.price.value;
    const packageInfo = {
      name,
      photoURL,
      day1,
      day2,
      day3,
      details,
      price,
      type,
    };

    const res = axiosSecure.post("/addPackage", packageInfo);
    res
      .then((res) => {
        swal("Success!", "You Are Successfully Added this package", "success");
        form.reset();
        console.log(res.data);
      })
      .catch((err) => {
        swal("Error!", `${err.message}`, "error");
        console.log(err);
      });

    console.log(name, photoURL, details, price);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <Grid>
      <Helmet>
        <title>Explore Elite | Add Package</title>
      </Helmet>
      <SectionTitle title={"Add  New Package"}></SectionTitle>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />

        <FormControl fullWidth>
          <InputLabel id="select-label">Select a Type</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={type}
            label="Select an Option"
            onChange={handleChange}
          >
            <MenuItem value="cultural">Cultural</MenuItem>
            <MenuItem value="adventure">Adventure</MenuItem>
            <MenuItem value="walking">Walking</MenuItem>
            <MenuItem value="urban">Urban</MenuItem>
            <MenuItem value="nature">Nature</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="PhotoURL"
          name="photoURL"
          variant="outlined"
          fullWidth
          margin="normal"
          type="text"
          required
        />
        <TextField
          label="Day 1 Plan"
          name="day1"
          variant="outlined"
          fullWidth
          margin="normal"
          type="text"
          required
        />
        <TextField
          label="Day 2 Plan"
          name="day2"
          variant="outlined"
          fullWidth
          margin="normal"
          type="text"
          required
        />
        <TextField
          label="Day 3 Plan"
          name="day3"
          variant="outlined"
          fullWidth
          margin="normal"
          type="text"
          required
        />

        <TextField
          label="Price"
          name="price"
          variant="outlined"
          fullWidth
          margin="normal"
          type="text"
          required
        />

        <TextField
          label="Details"
          name="details"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          type="text"
          required
        />

        <Button
          type="submit"
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
        >
          Add Package
        </Button>
      </form>
    </Grid>
  );
};

export default AddPackage;
