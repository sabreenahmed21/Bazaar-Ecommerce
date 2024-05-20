// import React, { useState, useEffect, useCallback } from "react";
// import userAvatar from "../../assets/user.png";
// import { Box, Button, Input, useTheme } from "@mui/material";
// import "./Profile.css";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { selectCurrentUser, updateProfilePhoto } from "../../Redux/UserSlice";
// import { AiOutlineCamera } from "react-icons/ai";

// import "react-toastify/dist/ReactToastify.css";

// const UpdateProfilePhoto = () => {
//   const [file, setFile] = useState(null);
//   const [imageURL, setImageURL] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const currentUser = useSelector(selectCurrentUser);
//   const accessToken = currentUser?.token;
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const userId = currentUser?.data?.user?._id;
//   console.log(userId);

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_URL}/api/getProfilePhoto/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((response) => {
//         console.log(response);
//         setImageURL(response.data.avatar.url);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [accessToken, userId]);

//   useEffect(() => {
//     if (currentUser?.data?.user?.avatar?.url) {
//       setImageURL(currentUser.data.user.avatar.url);
//     }
//   }, [currentUser]);

//   const formSubmitHandler = useCallback(
//     async (e) => {
//       e.preventDefault();
//       if (!file) {
//         return toast.warning("Please select a file!");
//       }
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("image", file);
//       try {
//         const response = await axios.post(
//           `${process.env.REACT_APP_URL}/api/updateProfilePhoto`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//         if (response.status === 200) {
//           toast.success("Profile photo updated successfully!");
//           dispatch(updateProfilePhoto(response.data.avatar));
//         }
//       } catch (error) {
//         toast.error(error?.response?.data?.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [accessToken, dispatch, file]
//   );

//   return (
//     <>
//       <ToastContainer />
//       <Box width={"100%"}>
//         <Box width={"205px"} height={"190px"} position="relative">
//           <img
//             alt="Profile"
//             src={file ? URL.createObjectURL(file) : imageURL || userAvatar}
//             className="profile-image"
//             onError={() => setImageURL(userAvatar)}
//           />
//           <label htmlFor="file">
//             <AiOutlineCamera
//               style={{
//                 position: "absolute",
//                 bottom: "8px",
//                 right: "8px",
//                 cursor: "pointer",
//                 fontSize: "xxx-large",
//                 color: "#555",
//                 backgroundColor: "#fff",
//                 borderRadius: "50%",
//                 padding: "8px",
//                 boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//               }}
//             />
//           </label>
//         </Box>
//         <form onSubmit={formSubmitHandler}>
//           <Input
//             id="file"
//             type="file"
//             name="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             style={{ display: "none" }}
//           />
//           <Button
//             type="submit"
//             disabled={loading}
//             sx={{
//               mt: "15px",
//               color: theme.palette.text.main,
//               backgroundColor: theme.palette.grey[100],
//               fontWeight: 600,
//             }}
//           >
//             {loading ? "Updating..." : "Update Image"}
//           </Button>
//         </form>
//       </Box>
//     </>
//   );
// };

// export default UpdateProfilePhoto;






import React, { useState, useEffect, useCallback } from "react";
import userAvatar from "../../assets/user.png";
import { Box, Button, Input, useTheme } from "@mui/material";
import "./Profile.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, updateProfilePhoto } from "../../Redux/UserSlice";
import { AiOutlineCamera } from "react-icons/ai";

import "react-toastify/dist/ReactToastify.css";

const UpdateProfilePhoto = () => {
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const accessToken = currentUser?.token;
  const dispatch = useDispatch();
  const theme = useTheme();
  const userId = currentUser?.data?.user?._id;

  // Fetch profile photo when component mounts or userId changes
  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/api/getProfilePhoto/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setImageURL(response.data.avatar.url);
      } catch (error) {
        console.error("Error fetching profile photo:", error);
        // Display error message to the user
        toast.error("Failed to fetch profile photo");
      }
    };

    if (userId) {
      fetchProfilePhoto();
    }
  }, [userId, accessToken]);

  const formSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (!file) {
        return toast.warning("Please select a file!");
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/api/updateProfilePhoto`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Profile photo updated successfully!");
          dispatch(updateProfilePhoto(response.data.avatar));
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [accessToken, dispatch, file]
  );

  return (
    <>
      <ToastContainer />
      <Box width={"100%"}>
        <Box width={"205px"} height={"190px"} position="relative">
          <img
            alt="Profile"
            src={file ? URL.createObjectURL(file) : imageURL || userAvatar}
            className="profile-image"
            onError={() => setImageURL(userAvatar)}
          />
          <label htmlFor="file">
            <AiOutlineCamera
              style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                cursor: "pointer",
                fontSize: "xxx-large",
                color: "#555",
                backgroundColor: "#fff",
                borderRadius: "50%",
                padding: "8px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
          </label>
        </Box>
        <form onSubmit={formSubmitHandler}>
          <Input
            id="file"
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <Button
            type="submit"
            disabled={loading}
            sx={{
              mt: "15px",
              color: theme.palette.text.main,
              backgroundColor: theme.palette.grey[100],
              fontWeight: 600,
            }}
          >
            {loading ? "Updating..." : "Update Image"}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default UpdateProfilePhoto;
