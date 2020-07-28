import {createStyles, Theme} from "@material-ui/core";

const responsiveGridLayoutStyle = (theme: Theme) => createStyles({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(2),
  }
});

export default responsiveGridLayoutStyle;
