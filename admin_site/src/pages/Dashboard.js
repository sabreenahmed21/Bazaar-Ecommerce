import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { grey, secondary } from "../Colors";
import YearlyOverview from "../components/YearOverview";
import { useGetSalesQuery } from "../services/Jsonserverapi";
import Orders from "./ClientFacing/orders/Orders";

export default function Dashboard() {
  const { data, isLoading, isError } = useGetSalesQuery();

  return (
    <Container>
      <Box>
        <Typography
          variant="h4"
          sx={{
            color: secondary[800],
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          dashboard
        </Typography>
        <Typography variant="h5" color={secondary[600]}>
          welcome to your dashboard
        </Typography>
      </Box>
      <Grid container py={2} gap={2}>
        <Grid xs={12} md={5.8}>
          {isLoading ? (
            <CircularProgress />
          ) : isError ? (
            <Typography variant="body2" textTransform={"capitalize"}>
              error fetching data
            </Typography>
          ) : (
            data &&
            data.salesReport.map((report) => (
              <Grid container gap="10px">
                <Grid xs={12} sm={6} md={5.8}>
                  <Box
                    sx={{
                      backgroundColor: grey[100],
                      p: 3,
                      borderRadius: "0.55rem",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                      Yearly Total Price
                    </Typography>
                    <Typography variant="body1">
                      {report.yearlySalesTotal}
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12} sm={5.7} md={5.8}>
                  <Box
                    sx={{
                      backgroundColor: grey[100],
                      p: 3,
                      borderRadius: "0.55rem",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                      Yearly Sales
                    </Typography>
                    <Typography variant="body1">
                      {report.yearlyTotalSoldUnits}
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6} md={5.8}>
                  <Box
                    sx={{
                      backgroundColor: grey[100],
                      p: 3,
                      borderRadius: "0.55rem",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                      Monthly Total Price
                    </Typography>
                    <Typography variant="body1">
                      {report.monthlyData.map((item) => item.totalSales)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12} sm={5.7} md={5.8}>
                  <Box
                    sx={{
                      backgroundColor: grey[100],
                      p: 3,
                      borderRadius: "0.55rem",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                      Monthly Sales
                    </Typography>
                    <Typography variant="body1">
                      {report.monthlyData.map((item) => item.totalUnits)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6} md={5.8}>
                  <Box
                    sx={{
                      backgroundColor: grey[100],
                      p: 3,
                      borderRadius: "0.55rem",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                      Total Price Today
                    </Typography>
                    <Typography variant="body1">
                      {report.dailyData.map((item) => item.totalSales)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12} sm={5.7} md={5.8}>
                  <Box
                    sx={{
                      backgroundColor: grey[100],
                      p: 3,
                      borderRadius: "0.55rem",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                      Sales Today
                    </Typography>
                    <Typography variant="body1">
                      {report.dailyData.map((item) => item.totalUnits)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            ))
          )}
        </Grid>
        <Grid xs={12} md={5.8}>
          <Box
            backgroundColor={grey[100]}
            borderRadius="0.55rem"
            width="100%"
            height="353px"
          >
            <YearlyOverview view="sales" />
          </Box>
        </Grid>
        <Grid xs={12}>
          <Orders isDashboard={true} />
        </Grid>
      </Grid>
    </Container>
  );
}
