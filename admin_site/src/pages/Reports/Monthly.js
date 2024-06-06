/* eslint-disable no-undef */
// @ts-nocheck
import { useMemo, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "../../services/Jsonserverapi";
import { primary, secondary } from "../../Colors";

export default function Monthly() {
  const { data, isLoading, isError, refetch } = useGetSalesQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const formattedData = useMemo(() => {
    if (!data) return [];

    const totalSalesLine = {
      id: "totalSales",
      color: secondary[800],
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: secondary[600],
      data: [],
    };

    data.salesReport.forEach((report) => {
      report.monthlyData.forEach(({ month, totalSales, totalUnits }) => {
        totalSalesLine.data.push({ x: month, y: totalSales });
        totalUnitsLine.data.push({ x: month, y: totalUnits });
      });
    });
    return [totalSalesLine, totalUnitsLine];
  }, [data]);

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
          MONTHLY SALES
        </Typography>
        <Typography variant="h5" color={secondary[600]}>
          Chart of monthly sales
        </Typography>
      </Box>
      <Box height="75vh">
        {isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <Box>Error fetching data. Please try again later.</Box>
        ) : (
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: secondary[800],
                  },
                },
                legend: {
                  text: {
                    fill: secondary[800],
                  },
                },
                ticks: {
                  line: {
                    stroke: secondary[800],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: secondary[800],
                  },
                },
              },
              legends: {
                text: {
                  fill: secondary[800],
                },
              },
              tooltip: {
                container: {
                  color: primary[500],
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        )}
      </Box>
    </Box>
  );
}
