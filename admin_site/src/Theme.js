import { createTheme } from "@mui/material/styles";
import { grey, secondary, primary, text } from "./Colors";

const theme = createTheme({
  palette: {
    primary: {
      main: primary[500],
      light: primary[400],
    },
    secondary: {
      main: secondary[600],
      light: secondary[700],
    },
    neutral: {
      main: grey[500],
    },
    background: {
      default: secondary[600],
      alt: grey[100],
    },
    grey,
    text
  },
});

export default theme;


