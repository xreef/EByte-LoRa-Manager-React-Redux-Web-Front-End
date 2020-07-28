import {
  drawerWidth,
  transition,
  container
} from "../../../component/style/material-dashboard-react";
import { createStyles, Theme } from '@material-ui/core/styles';

const appStyle = (theme: Theme) => createStyles({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 170px)"
  },
  container,
  map: {
    marginTop: "70px"
  }
});

export default appStyle;
