import React, {RefObject} from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "./style/tableStyle";
import PerfectScrollbar from "perfect-scrollbar";
import {ThemeColors} from "../../layouts/GenericTypes";

interface Props {
    classes: any,
    tableHeaderColor: ThemeColors,// "warning" | "primary" | "danger" | "success" | "info" | "rose" | "gray",
    tableHead: string[],
    tableData: (JSX.Element | string)[][][],

    height: string
}

class CustomTable extends React.Component<Props> {
    tableContainerRef = React.createRef<HTMLDivElement>();

    static defaultProps = {
      tableHeaderColor: "gray" as ThemeColors
  }

  constructor(props: Props) {
    super(props);
  }

  // setTableContainerRef = (tableContainerRef) => {
  //   this.tableContainerRef = tableContainerRef;
  // };

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1 && this.tableContainerRef && this.tableContainerRef.current) {
      const ps = new PerfectScrollbar(this.tableContainerRef.current);
    }
  }

  render() {
    const {classes, tableHead, tableData, tableHeaderColor} = this.props;
    const {height} = this.props;
    return (

      <div className={classes.tableResponsive + ' ' + classes.tableCards1x} style={{height: height}} ref={this.tableContainerRef}>

        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody className={classes.tableBodyCardSize}>
            {tableData.map((prop, key) => {
              return (
                <TableRow key={key}>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell +" "+((typeof prop !== 'string')?classes.tableCellSmile:"")} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

// CustomTable.defaultProps = {
//   tableHeaderColor: "gray"
// };
//
// CustomTable.propTypes = {
//   classes: PropTypes.object.isRequired,
//   tableHeaderColor: PropTypes.oneOf([
//     "warning",
//     "primary",
//     "danger",
//     "success",
//     "info",
//     "rose",
//     "gray"
//   ]),
//   tableHead: PropTypes.arrayOf(PropTypes.string),
//   tableData: PropTypes.arrayOf(PropTypes.array)
// };

export default withStyles(tableStyle)(CustomTable);
