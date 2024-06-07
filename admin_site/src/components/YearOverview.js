//@ts-nocheck
import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { primary, secondary } from "../Colors";
import { useGetSalesQuery } from "../services/Jsonserverapi";
import { Box, CircularProgress } from "@mui/material";

export default function YearlyOverview({ view }) {
  const { data, isLoading, isError } = useGetSalesQuery();

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [[], []];

    const totalSalesLine = {
      id: "totalSales",
      color: secondary.main,
      data: [],
    };

    const totalUnitsLine = {
      id: "totalUnits",
      color: secondary[600],
      data: [],
    };

    data.salesReport.forEach((report) => {
      report.monthlyData.forEach(({ month, totalSales, totalUnits }) => {
        const existingSalesPoint = totalSalesLine.data.find(
          (point) => point.x === month
        );
        const existingUnitsPoint = totalUnitsLine.data.find(
          (point) => point.x === month
        );

        if (existingSalesPoint) {
          existingSalesPoint.y += totalSales;
        } else {
          totalSalesLine.data.push({ x: month, y: totalSales });
        }

        if (existingUnitsPoint) {
          existingUnitsPoint.y += totalUnits;
        } else {
          totalUnitsLine.data.push({ x: month, y: totalUnits });
        }
      });
    });

    return [[totalSalesLine], [totalUnitsLine]];
  }, [data]);

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "50vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "50vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Error fetching data
      </Box>
    );

  return (
    <>
      <ResponsiveLine
        data={view === "sales" ? totalSalesLine : totalUnitsLine}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: secondary[900],
              },
            },
            legend: {
              text: {
                fill: secondary[900],
              },
            },
            ticks: {
              line: {
                stroke: secondary[900],
                strokeWidth: 1,
              },
              text: {
                fill: secondary[900],
              },
            },
          },
          legends: {
            text: {
              fill: secondary[900],
            },
          },
          tooltip: {
            container: {
              color: primary[500],
            },
          },
        }}
        margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
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
        enableArea="false"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 90,
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 90,
          legend: `Total ${view === "sales" ? "Sales" : "Units"} for Year`,
          legendOffset: -60,
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
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 30,
            translateY: -40,
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
    </>
  );
}
