import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid, {GridSpacing} from '@material-ui/core/Grid';
import {createStyles, Theme} from "@material-ui/core";

const style =(theme: Theme) => createStyles({
  grid: {
    margin: '0 -15px !important',
    width: 'unset',
  }
});

interface Props {
    classes: any,
    spacing?: GridSpacing,
    children: React.ReactElement | React.ReactElement[]
}

function GridContainer(props: Props) {
  const { classes, children, ...rest } = props;
  return (
    <Grid  container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

export default withStyles(style)(GridContainer);
