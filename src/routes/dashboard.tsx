import Dashboard from '@material-ui/icons/Dashboard';
// import Person from '@material-ui/icons/Person';
//
// import CalendarViewDay from '@material-ui/icons/CalendarViewDay';
// import Today from '@material-ui/icons/Today';
// import Info from '@material-ui/icons/Info';
// import Warning from '@material-ui/icons/Warning';
// import Settings from '@material-ui/icons/Settings';

import { FormattedMessage } from 'react-intl';
import React, {ComponentClass, FunctionComponent} from 'react';
import {
  Home, // Intro, About, //Daily, Historical, InverterInfoState,
} from '../views';
import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {SvgIconTypeMap} from "@material-ui/core";
import {RouteComponentProps, StaticContext} from "react-router";
import {Settings} from "@material-ui/icons";
import Configuration from "../views/Configuration";
// import Configuration from '../views/Configuration';

export interface IDashboardRoute {
    path: string,
    sidebarName: JSX.Element | string,
    navbarName: JSX.Element | string,
    icon: OverridableComponent<SvgIconTypeMap>,
    component: ComponentClass<any, any> | FunctionComponent<any> | ComponentClass<RouteComponentProps<any, StaticContext, {} | null | undefined>, any>,

    redirect?: boolean,
    to?: string
}
export interface IDashboardRouteRedirect {
    path: string,
    navbarName: JSX.Element | string,
    redirect: boolean,
    to: string

    component?: ComponentClass<any, any> | FunctionComponent<any> | ComponentClass<RouteComponentProps<any, StaticContext, {} | null | undefined>, any>,
}

const dashboardRoutes: Array<IDashboardRouteRedirect | IDashboardRoute> = [
  {
    path: '/home',
    sidebarName: <FormattedMessage id="menu.sidebar.home" />,
    navbarName: <FormattedMessage id="menu.navbar.home" />,
    icon: Dashboard,
    component: Home
  },
  {
    path: '/configuration',
    sidebarName: <FormattedMessage id="menu.sidebar.configuration" />,
    navbarName: <FormattedMessage id="menu.navbar.configuration" />,
    icon: Settings, // "content_paste",
    component: Configuration
  },
  // {
  //   path: '/montly',
  //   sidebarName: <FormattedMessage id="menu.sidebar.monthly" />,
  //   navbarName: <FormattedMessage id="menu.navbar.monthly" />,
  //   icon: Today,
  //   component: Historical
  // },
  // {
  //   path: '/info_state',
  //   sidebarName: <FormattedMessage id="menu.sidebar.information_state" />,
  //   navbarName: <FormattedMessage id="menu.navbar.information_state" />,
  //   icon: Warning,
  //   component: InverterInfoState
  // },
  // {
  //   path: '/configuration',
  //   sidebarName: <FormattedMessage id="menu.sidebar.configuration" />,
  //   navbarName: <FormattedMessage id="menu.navbar.configuration" />,
  //   icon: Settings,
  //   component: Configuration
  // },
  // {
  //   path: '/intro',
  //   sidebarName: <FormattedMessage id="menu.sidebar.introduction" />,
  //   navbarName: <FormattedMessage id="menu.navbar.introduction" />,
  //   icon: Info,
  //   component: Intro
  // },
  // {
  //   path: '/about',
  //   sidebarName: 'About',
  //   navbarName: 'About',
  //   icon: Person,
  //   component: About
  // },
  //  {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   sidebarName: "Upgrade To PRO",
  //   navbarName: "Upgrade To PRO",
  //   icon: Unarchive,
  //   component: UpgradeToPro
  // },
  {
    redirect: true, path: '/', to: '/home', navbarName: 'Redirect'
  }
];

export default dashboardRoutes;
