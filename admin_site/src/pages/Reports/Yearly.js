/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { secondary } from "../../Colors";
import YearlyOverview from "../../components/YearOverview";

export default function Yearly() {
  const [view, setView] = useState("sales");

  return (
    <Box m="1rem">
      <Box>
        <Typography
          variant="h4"
          sx={{
            color: secondary[800],
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          OVERVIEW
        </Typography>
        <Typography variant="h5" color={secondary[600]}>
          Overview of general revenue and profit
        </Typography>
      </Box>
      <Box height="70vh" mt="20px">
        <FormControl>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>{" "}
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <YearlyOverview view={view} />
      </Box>
    </Box>
  );
}
