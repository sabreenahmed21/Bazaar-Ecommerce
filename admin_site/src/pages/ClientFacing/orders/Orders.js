import {
  Box,
  useTheme,
  Typography,
  Button,
  CircularProgress
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} from "../../../services/Jsonserverapi";
import { grey, secondary } from "../../../Colors";
import { MdDelete } from "react-icons/md";
import { PiPrinterBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Orders({isDashboard = false}) {
  const { data, isLoading, isError, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();

  const theme = useTheme();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day} `;
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await deleteOrder(id).unwrap();
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "The order has been deleted.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire("Error!", error.data.message, "error");
      }
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      await updateOrder({ id, status }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", error.data.message, "error");
    }
  };

  const navigate = useNavigate();

  const handlePrint = (order) => {
    navigate(`/print/${order._id}`);
  };

  const handleRowClick = (order) => {
    navigate(`/orderDetails/${order.id}`)
  }

  const handleActionsClick = (event) => {
    event.stopPropagation();
  };

  const columns = [
    {
      field: "_id",
      headerName: "Order ID",
      width: 150,
    },
    {
      field: "user",
      headerName: "Customer",
      width: 150,
      valueGetter: (params) => params.name,
    },
    {
      field: "shippingInfo",
      headerName: "Shipping Info",
      width: 200,
      valueGetter: (params) => `${params.address}, ${params.country}`,
    },
    {
      field: "paymentInfo",
      headerName: "Payment Status",
      width: 130,
      valueGetter: (params) => `${params.status}`,
      renderCell: (params) => (
        <Box
          sx={{
            lineHeight: 2.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              backgroundColor: "lightgreen",
              border: "2px solid green",
              color: "green",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            {params.value}
          </Box>
        </Box>
      ),
    },
    {
      field: "orderItems",
      headerName: "Order Items",
      width: 300,
      valueGetter: (params) =>
        params.map((item) => `${item.title} (x${item.quantity})`).join(", "),
    },
    {
      field: "totalQuantity",
      headerName: "Quantity",
      width: 80,
    },
    {
      field: "orderStatus",
      headerName: "order Status",
      width: 110,
      renderCell: (params) => (
        <Box
          sx={{
            lineHeight: 2.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            
          }}
        >
          <Box
            sx={{
              backgroundColor:
                params.value === "Processing"
                  ? "yellow"
                  : params.value === "Delivered"
                  ? "lightgreen"
                  : "",
              color:
                params.value === "Processing"
                  ? "black"
                  : params.value === "Delivered"
                  ? "green"
                  : "",
              textAlign: "center",
              borderRadius: "15px",
            }}
          >
            {params.value}
          </Box>
        </Box>
      ),
    },
    {
      field: "itemsPrice",
      headerName: "Items Price",
      width: 90,
      valueFormatter: (params) => params.toFixed(2),
    },
    {
      field: "taxPrice",
      headerName: "Tax Price",
      width: 80,
      valueFormatter: (params) => params.toFixed(2),
    },
    {
      field: "shippingPrice",
      headerName: "Shipping Price",
      width: 110,
      valueFormatter: (params) => params.toFixed(2),
    },
    {
      field: "totalPrice",
      headerName: "Total",
      width: 80,
      valueFormatter: (params) => params.toFixed(2),
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 100,
      valueGetter: (params) => formatDate(params),
    },
    {
      headerName: "Actions",
      width: 160,
      renderCell: (params) => (
        <Box onClick={handleActionsClick}>
          <MdDelete
            onClick={() => handleDelete(params.id)}
            style={{
              cursor: "pointer",
              marginRight: "10px",
              fontSize: "large",
            }}
            onMouseDown={(e) => e.preventDefault()}
          />
          <PiPrinterBold
            onClick={() => handlePrint(params.row)}
            style={{
              cursor: "pointer",
              marginRight: "10px",
              fontSize: "large",
            }}
            onMouseDown={(e) => e.preventDefault()}
          />
          <Button
            variant="outlined"
            onClick={() => handleUpdate(params.id, "Delivered")}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              background: "none",
              cursor: "pointer",
              padding: "0",
              fontSize: "inherit",
              color: "inherit",
              textTransform: "capitalize",
            }}
          >
            Deliver
          </Button>
        </Box>
      ),
    },
  ];

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
        Error fetching data {error?.data.message}
      </Box>
    );

  return (
    <Box sx={{m: isDashboard? '' : '1rem'}}>
      <Typography variant="h4"
        sx={{
          color: secondary[800],
          fontWeight: "bold",
          display: isDashboard ? 'none' : ''
        }}>
        Orders
      </Typography>
      <Box
        m="auto"
        width="100%"
        maxWidth="1200px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          mt: isDashboard? '' : 5,
          height: isDashboard? '50vh':'70vh',
          "& .MuiDataGrid-root": {
            border: "1px #00000014 solid",
            width: 0,
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: isDashboard ? grey[50] : secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        {data && data.orders.length === 0 ? (
          <Typography variant="body1">No orders found</Typography>
        ) : (
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data?.orders || []}
            columns={columns}
            onRowClick={handleRowClick}
          />
        )}
      </Box>
    </Box>
  );
}
