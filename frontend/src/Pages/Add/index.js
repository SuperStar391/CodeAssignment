import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Box, Container, MenuItem } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransactionAction,
  clearError,
  clearMessage,
} from "../../Redux/Slices/Transaction/transactionSlice";
import { useAlert } from "react-alert";
import Loader from "../../Components/Loader/Loader";

const AddTransaction = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loader, message } = useSelector((state) => state.transaction);
  const customers = ["Lucaks", "Tom", "Anna", "Collin"];

  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(null);
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    if (name) {
      const indexValue = customers.indexOf(name);
      setId(indexValue + 1);
    }

    if (date) {
      setNewDate(date);
    }

    if (error) {
      if (typeof error == "object") {
        let newError = [];
        error.forEach((err, index) => {
          return newError.push(<p key={index}>{err}</p>);
        });
        alert.error(newError);
        dispatch(clearError());
      } else {
        alert.error(error);
        dispatch(clearError());
      }
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, date, id, alert, error, message, dispatch]);

  const handleSubmit = () => {
    dispatch(
      addTransactionAction({
        customerId: id,
        customerName: name,
        amount,
        createdAt: newDate,
      })
    );
    setId(null);
    setName("");
    setAmount("");
    setDate(null);
    setNewDate("");
  };

  return (
    <Container maxWidth="sm" sx={{ my: "60px" }}>
      {loader ? (
        <Loader />
      ) : (
        <Box>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box sx={{ m: 2 }}>
              <TextField
                select
                label="Customer Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              >
                {customers.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ m: 2 }}>
              <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
              />
            </Box>
            <Box sx={{ m: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Choose Date"
                  renderInput={(params) => <TextField {...params} />}
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  maxDate={new Date()}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ m: 2 }}>
              <Button variant="contained" type="submit" fullWidth>
                Add Transaction
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Container>
  );
};

export default AddTransaction;
