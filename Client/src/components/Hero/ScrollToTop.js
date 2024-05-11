import { Fab, Zoom, useScrollTrigger, useTheme } from "@mui/material";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

export default function ScrollToTop() {
  const theme = useTheme();
  return (
    <Zoom in={useScrollTrigger()}>
      <Fab
        sx={{
          ":hover": { backgroundColor: theme.palette.text.yellow , color: "#fff" },
          backgroundColor: theme.palette.text.yellow,
          color: "#fff",
          zIndex:1,
          position:'fixed',
          bottom:'40px',
          right: '10px',
        }}
        size="medium"
        onClick={() => {
          window.scrollTo(0,0);
        }}
      >
        <MdKeyboardDoubleArrowUp />
      </Fab>
    </Zoom>
  );
}
