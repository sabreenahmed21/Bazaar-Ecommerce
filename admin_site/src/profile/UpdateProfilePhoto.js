import React, { useState, useEffect, useCallback } from "react";
import userAvatar from "../assets/user.png";
import { Box, Button, Input } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import { selectCurrentAdmin, updateProfilePhoto } from "../redux/AdminSlice";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfilePhoto = () => {
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const CurrentAdmin = useSelector(selectCurrentAdmin);
  const accessToken = CurrentAdmin.token;
  const dispatch = useDispatch();

  const userId = CurrentAdmin?.data?.user?._id;

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
        toast.error("Failed to fetch profile photo : ", error);
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
      <Box
        width={"100%"}
        display="flex"
        justifyContent="center"
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box width={"100%"} display="flex" justifyContent="center">
          <Box width={"240px"} height={"240px"} position="relative">
            <img
              alt="Profile"
              src={file ? URL.createObjectURL(file) : imageURL || userAvatar}
              onError={() => setImageURL(userAvatar)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <label htmlFor="file">
              <AiOutlineCamera
                style={{
                  position: "absolute",
                  bottom: "-15px",
                  right: "-15px",
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
            variant="outlined"
            sx={{
              mt: 4,
              fontWeight: 600,
            }}
          >
            {loading ? "Updating..." : "Update New Photo"}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default UpdateProfilePhoto;
