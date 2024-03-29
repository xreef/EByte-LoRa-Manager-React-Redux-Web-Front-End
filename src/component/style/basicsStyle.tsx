import { container, title } from './material-dashboard-react';
import customCheckboxRadioSwitch from './customCheckboxRadioSwitch';
import modalStyle from './modalStyle';
import {createStyles, Theme} from "@material-ui/core";

const basicsStyle  = (theme: Theme) => createStyles({
  sections: {
    padding: '70px 0'
  },
  container,
  title: {
    ...title,
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none'
  },
  space50: {
    height: '50px',
    display: 'block'
  },
  space70: {
    height: '70px',
    display: 'block'
  },
  icons: {
    width: '17px',
    height: '17px',
    color: '#FFFFFF'
  },

  textField: {
    flexBasis: 200,
    width: '100%'
  },

  ...customCheckboxRadioSwitch,
  ...modalStyle
});

export default basicsStyle;
