// @ts-nocheck
import {
  Box,
  useTheme,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import {
  useDeleteAdminByAdminMutation,
  useGetAllAdminsQuery,
} from "../../services/Jsonserverapi";
import { secondary } from "../../Colors";

export default function Admins() {
  const { data, isLoading, error, isError, refetch } = useGetAllAdminsQuery();
  const [deleteAdmin] = useDeleteAdminByAdminMutation();

  const theme = useTheme();

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
        await deleteAdmin(id);
        refetch();
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the user.", "error");
        console.error("Failed to delete the user: ", error);
      }
    }
  };

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

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 200,
    },
    {
      field: "name",
      headerName: "Name",
      width: 180,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "verified",
      headerName: "Verified",
      width: 80,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      valueGetter: (params) => formatDate(params),
    },
    {
      field: "Remove",
      headerName: "Remove",
      width: 80,
      renderCell: (params) => (
        <IconButton
          sx={{ color: secondary[900] }}
          onClick={() => handleDelete(params.row._id)}
        >
          <MdDelete />
        </IconButton>
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
        Error {error?.data.message}
      </Box>
    );

  return (
    <Box m="1rem">
      <Typography
        variant="h4"
        sx={{
          color: secondary[800],
          fontWeight: "bold",
        }}
      >
        Admins
      </Typography>
      <Box
        m="auto"
        mt="40px"
        height="50vh"
        width="100%"
        maxWidth="1200px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          "& .MuiDataGrid-root": {
            border: "1px #00000014 solid",
            width: 0,
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: secondary[100],
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
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data?.data.admins || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
}
