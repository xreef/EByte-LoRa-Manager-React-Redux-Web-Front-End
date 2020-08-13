import React, {Component} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// core components
import Card from "../card/Card";
import CardBody from "../card/CardBody";
import CardHeader from "../card/CardHeader";

import customTabsStyle from './style/customTabsStyle';
import {ThemeColors} from "../../layouts/GenericTypes";
import boxStyle from "../../layouts/box/style/boxStyle";

export interface Tab {
    tabKey: string | number,
    tabName: string | JSX.Element,
    tabIcon: any,
    tabContent: JSX.Element
}

interface Props {
    classes: any,
    headerColor: ThemeColors,
    title: string,
    tabs: Tab[],
    headerButtons?: JSX.Element,
    tabIcon?: any,
    tabContent?: JSX.Element[],
    plainTabs?: boolean,
    rtlActive?: boolean,

    selectedTab?: number | string,

    handleChange?: (key: string) => void
}

interface OwnState {
    value: string | number
}

class CustomTabs extends React.Component<Props,OwnState> {
    static defaultProps = {
        headerColor: 'danger' as ThemeColors,
        plainTabs: false
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.selectedTab || props.tabs[0].tabKey || 0
        };
    }

    componentDidUpdate(prevProps: Props){
        if (this.props.selectedTab && prevProps.selectedTab != this.props.selectedTab){
            this.setState({value: this.props.selectedTab});
        }
        // if ( this.props.selectedTab && this.props.tabs.filter(elem => elem.tabKey == this.state.value).length===0){
        //     this.setState({
        //         value: this.props.tabs[0].tabKey || 0
        //     })
        // }
    }

  handleChange = (event: any, value: string) => {
    this.setState({ value });
    this.props.handleChange && this.props.handleChange(value);

  };
  render() {
    const {
      classes,
      headerColor,
      plainTabs,
      tabs,
      title,
      rtlActive,
        headerButtons
    } = this.props;

    let {value} = this.state;
    if (this.props.tabs.filter(elem => elem.tabKey == this.state.value).length===0){
        value = this.props.tabs[0].tabKey;
    }

    const cardTitle = classNames({
      [classes.cardTitle]: true,
      [classes.cardTitleRTL]: rtlActive
    });
    return (
      <Card plain={plainTabs}>
        <CardHeader color={headerColor} plain={plainTabs}>
          {title !== undefined ? (
            <div className={cardTitle}>{title}</div>
          ) : <div></div>}
            {headerButtons!==undefined ? (headerButtons) : <div></div>}
          <Tabs
            value={value}
            onChange={this.handleChange}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.displayNone,
              scrollButtons: classes.displayNone
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((prop, key) => {
              var icon = {};
              if (prop.tabIcon) {
                icon = {
                  icon: <prop.tabIcon />
                };
              }
              return (
                <Tab
                  classes={{
                    root: classes.tabRootButton,
                    // labelContainer: classes.tabLabelContainer,
                    // label: classes.tabLabel,
                    selected: classes.tabSelected,
                    wrapper: classes.tabWrapper
                  }}
                  tabIndex={prop.tabKey || key}
                  value={prop.tabKey || key}
                  key={prop.tabKey}
                  label={prop.tabName}
                  {...icon}
                />
              );
            })}
          </Tabs>
        </CardHeader>
        <CardBody>
          {tabs.map((prop, key) => {
            if ((prop.tabKey || key) === value) {
              return <div key={prop.tabKey || key}>{prop.tabContent}</div>;
            }
            return null;
          })}
        </CardBody>
      </Card>
    );
  }
}

// CustomTabs.propTypes = {
//   classes: PropTypes.object.isRequired,
//   headerColor: PropTypes.oneOf([
//     "warning",
//     "success",
//     "danger",
//     "info",
//     "primary"
//   ]),
//   title: PropTypes.string,
//   tabs: PropTypes.arrayOf(
//     PropTypes.shape({
//       tabName: PropTypes.string.isRequired,
//       tabIcon: PropTypes.func,
//       tabContent: PropTypes.node.isRequired
//     })
//   ),
//   rtlActive: PropTypes.bool,
//   plainTabs: PropTypes.bool
// };

export default withStyles(customTabsStyle)(CustomTabs);
