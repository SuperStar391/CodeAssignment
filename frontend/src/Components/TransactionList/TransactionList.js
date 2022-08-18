import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

const calculatePoint = (amount) => {
  if (amount > 100) {
    return (amount - 100) * 2 + 50;
  } else if (amount > 50) {
    return amount - 50;
  }
  return 0;
};

const TransactionList = ({ data }) => {
  const [list, setList] = useState();
  let now = new Date();
  const month_names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    let tList = {};
    data.forEach((element) => {
      if (!tList[element.customerName]) {
        tList[element.customerName] = {
          data: [],
          monthlyTotal: Array(12),
        };
      }
      let point = calculatePoint(element.amount);
      tList[element.customerName]["data"].push({
        amount: element.amount,
        createdAt: element.createdAt.slice(0, 10),
        points: point,
      });
      if (tList[element.customerName]["total"]) {
        tList[element.customerName]["total"] += point;
      } else {
        tList[element.customerName]["total"] = point;
      }
      let createdAt = new Date(element.createdAt);
      if (
        now.getFullYear() === createdAt.getFullYear() &&
        now.getMonth() - 3 < createdAt.getMonth()
      ) {
        let month = createdAt.getMonth();
        if (tList[element.customerName]["monthlyTotal"][month]) {
          tList[element.customerName]["monthlyTotal"][month] += point;
        } else {
          tList[element.customerName]["monthlyTotal"][month] = point;
        }
      }
    });
    setList(tList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {list &&
        Object.keys(list).map((key) => (
          <Box key={key} sx={{ m: 4 }}>
            <h2>{key}</h2>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Amount</TableCell>
                    <TableCell>Point</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list[key]["data"].map((element, index) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={index}
                    >
                      <TableCell>{element.amount}</TableCell>
                      <TableCell>{element.points}</TableCell>
                      <TableCell>{element.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: "flex", gap: "40px" }}>
              <Box>
                <span>Total: </span> {list[key]["total"]}
              </Box>
              {list[key]["monthlyTotal"].map((point, index) => (
                <Box key={index}>
                  <span>{month_names[index]}: </span> {point}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
    </>
  );
};

export default TransactionList;
