import { useMemo, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Box, CircularProgress, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "../../services/Jsonserverapi";
import { secondary, primary } from "../../Colors";

export default function Daily() {
  const [startDate, setStartDate] = useState(new Date("2024/06/06"));
  const [endDate, setEndDate] = useState(new Date("2024/06/07"));
  const { data, isLoading, isError, refetch } = useGetSalesQuery();

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

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
      report.dailyData.forEach(({ date, totalSales, totalUnits }) => {
        const dateFormatted = new Date(date);

        if (dateFormatted >= startDate && dateFormatted <= endDate) {
          const splitDate = dateFormatted.toISOString().split("T")[0];

          if (
            splitDate &&
            totalSales !== undefined &&
            totalUnits !== undefined
          ) {
            totalSalesLine.data.push({ x: splitDate, y: totalSales });
            totalUnitsLine.data.push({ x: splitDate, y: totalUnits });
          }
        }
      });
    });

    return [totalSalesLine, totalUnitsLine];
  }, [data, startDate, endDate]);

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
          DAILY SALES
        </Typography>
        <Typography variant="h5" color={secondary[600]}>
          Chart of daily sales
        </Typography>
      </Box>
      <Box
        sx={{
          height: "70vh"
        }}
      >
        <Box display="flex" justifyContent="flex-end" gap="4px" mr={7}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            customInput={<CustomInput label="Start Date" />}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy/MM/dd"
            customInput={<CustomInput label="End Date" />}
          />
        </Box>
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
                    stroke: secondary[700],
                  },
                },
                legend: {
                  text: {
                    fill: secondary[700],
                  },
                },
                ticks: {
                  line: {
                    stroke: secondary[700],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: secondary[700],
                  },
                },
              },
              legends: {
                text: {
                  fill: secondary[700],
                },
              },
              tooltip: {
                container: {
                  color: primary.main,
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

const CustomInput = ({ value, onClick, label }) => (
  <Box
    onClick={onClick}
    sx={{
      display: "inline-block",
      p: 1,
      bgcolor: "background.paper",
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 1,
      cursor: "pointer",
      textAlign: "center",
      width: "120px",
    }}
  >
    <Typography variant="caption" display="block" gutterBottom>
      {label}
    </Typography>
    <Typography variant="body2">{value}</Typography>
  </Box>
);
