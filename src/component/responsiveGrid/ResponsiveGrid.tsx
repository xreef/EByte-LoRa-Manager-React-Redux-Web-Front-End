import React from 'react';
// import ReactDom from 'react-dom';
// import PropTypes from 'prop-types';

import { Responsive, WidthProvider } from 'react-grid-layout';
import Button from '@material-ui/core/Button';

import './style/responsiveGridLayout.less';

import { withStyles } from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';

import { FormattedMessage/*, injectIntl*/ } from 'react-intl';
import responsiveGridLayoutStyle from './style/responsiveGridLayoutStyle';
import {ILayoutConfigured, ILayoutElement} from "../../redux/types/home";
// import {AppActions} from "../../redux/types";
import {Function} from "@babel/types";
import Fab from '@material-ui/core/Fab';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface ResponsiveGridProps {
    gridConfig: any,
    // layouts is an object mapping breakpoints to layouts.
    // e.g. {lg: Layout, md: Layout, ...}
    layouts: ILayoutConfigured,
    elements: ILayoutElement[],

    showSaveLayoutsButton: boolean,
    saveLayouts: Function | any,

    classes: any
}

interface IResponsiveGridState {
    layouts: ILayoutConfigured,
    tmpLayouts?: ILayoutConfigured,
    breakpoint: string,
    additionalInfo: any
}

class ResponsiveGrid extends React.PureComponent<ResponsiveGridProps,IResponsiveGridState> {
  static defaultProps = {
        gridConfig: {
            // draggableHandle: '.dragHeader',
            draggableHandle: '.dragHeader',
            className: 'responsive-grid-layout',
            rowHeight: 175,
            // currentBreakpoint: this.previousLayoutBreakpoint,
            // Various layout that can be present on windows size change
            cols: {
                lg: 5, md: 4, sm: 3, xs: 2, xxs: 1
            },
            // cols: {lg: 3, md: 2, sm: 1},
            // The breaking layout
            breakpoints: {
                lg: 1800, md: 1400, sm: 1100, xs: 720, xxs: 0
            },
            // breakpoints: {lg: 1800, md: 1100, sm: 0}
            // ,sizeParameter: {
            //     maxH: undefined,
            //     maxW: undefined,
            //     minH: undefined,
            //     minW: undefined
            // },
            // moveParameter: {
            //     isDraggable: true,
            //     isResizable: false,
            //     static: false
            // }
            isDraggable: true,
            isResizable: true
        },
        layouts: {
            lg: [], md: [], sm: [], xs: [], xxs: []
        },

        elements: [],

        showSaveLayoutsButton: false,
        saveLayouts: (layout: any) => console.log(layout)
  }

  constructor(props: ResponsiveGridProps) {
    super(props);

    this.state = this.init();
  }

  componentDidUpdate(oldProps: ResponsiveGridProps) {
    if (this.props.elements.length !== oldProps.elements.length) {
      this.setState(this.init());
    }
  }

  init = () => {
    let { layouts, gridConfig } = this.props;

    interface AdditionalInfo {
      [key: string]: any
    }
    const additionalInfo: AdditionalInfo = {};

    // layouts['lg'].forEach((elem)=>{
    //     additionalInfo.push(elem.additionalInfo);
    // });
    //

    this.props.elements.forEach((elem: ILayoutElement) => {
      const firstKey = Object.keys(layouts)[0];
      const isAlreadyInLayout = layouts[firstKey].some(elemLay => elemLay.i === elem.i) || false;
      if (!isAlreadyInLayout) {
        layouts = this.addNewItem(elem, layouts, additionalInfo, gridConfig);
      }

      elem.additionalInfo.id = elem.i;
      if (elem.i){
        additionalInfo[elem.i] = elem.additionalInfo;
      }
    });

    return {
      breakpoint: 'lg',
      layouts,
      additionalInfo
    };
  };

  addNewItem = (elem: ILayoutElement, layouts: ILayoutConfigured, additionalInfo: any, gridConfig: any) => {
    // console.log('adding', divUniqueId);
    if (elem.id && elem.id in additionalInfo) {
      throw new Error('Elemento già presente!');
      // return;
    }

    const newLayouts: ILayoutConfigured = { ...layouts };
    Object.keys(newLayouts).forEach((key: string) => {
      let total = 0;

      const layout: ILayoutElement[] = newLayouts[key] || [];

      // const xVal = (layout.length>1 && layout[layout.length - 1].x) || 0;

      if ( layout.length > 0 ) total += layout[layout.length - 1].w + (layout[layout.length - 1].x || 0);

      if (total + elem.w > gridConfig.cols[key]) {
        total = 0;
      }

      layout.push({ ...elem, ...{ x: total % (gridConfig.cols[key]), y: Infinity }/* , additionalInfo: {...elem.additionalInfo, ...{id: elem.i}} */ });
      newLayouts[key] = layout;
    });

    return newLayouts;
  };

    onBreakpointChange = (breakpoint: string) => {
      this.setState({ breakpoint });
    };

    onLayoutChange = (layout: ILayoutElement[], layouts: ILayoutConfigured) => {
      this.setState({ tmpLayouts: layouts });
    };

    onResizeStart = (layout: ILayoutElement[], from: number, to: number) => {
      // const addI = this.state.additionalInfo[from.i];
    };

    onResize = (layout: ILayoutElement[], from: number, to: number, elem: ILayoutElement, event: Event, dragger: HTMLElement) => {
      // console.log(layout, from, to, elem, event, dragger);
      // const addI = this.state.additionalInfo[from.i];
    };

    onResizeStop = (layout: ILayoutElement[], from: number, to: number) => {
      // const addI = this.state.additionalInfo[from.i];

      setTimeout(() => window.dispatchEvent(new Event('resize')), 250);
    };

    onDragStop = (layout: ILayoutElement[], from: number, to: number) => {
      // const addI = this.state.additionalInfo[from.i];
    };

    onDragStart = (layout: ILayoutElement[], from: number, to: number) => {
      // const addI = this.state.additionalInfo[from.i];
    };

    onDrag = (layout: ILayoutElement[], from: number, to: number, elem: ILayoutElement, event: Event, dragger: HTMLElement) => {
      // console.log(layout, from, to, elem, event, dragged);
      // const addI = this.state.additionalInfo[from.i];
    };

    getCard = (additionalInfo: any) => {
      if (additionalInfo.classObj) {
        return additionalInfo.classObj(additionalInfo.id, { ...(additionalInfo.settingsProps || additionalInfo.defaultProps), boxType: additionalInfo.boxType });
      }
    };

    getAllDivs = () => {
      const { layouts, breakpoint, additionalInfo } = this.state;
      const alldivs: JSX.Element[] = [];
      if (layouts[breakpoint]) {
        layouts[breakpoint].forEach((elem) => {
          alldivs.push(<div id={elem.i} key={elem.i}>{(elem.i)?this.getCard(additionalInfo[elem.i]):null}</div>);
        });
      }
      return alldivs;
    };

    render() {
      const { gridConfig, classes } = this.props;
      const { showSaveLayoutsButton, saveLayouts } = this.props;
      const { layouts, tmpLayouts } = this.state;

      let fabButtons = null;
      if (showSaveLayoutsButton) {
        fabButtons = (
          <Tooltip key="responsiveGridButtonTooltipId" placement="left" title={<FormattedMessage id="home.fab.tooltip" />}>
            <Button
              key="responsiveGridButtonId"
              // variant="fab"
              className={classes.fab}
              color="secondary"
              onClick={() => saveLayouts(tmpLayouts || layouts)}
            >
                <Fab className={classes.fab} color="secondary">
                    <SaveIcon />
                </Fab>
            </Button>
          </Tooltip>
        );
      }

      return [<ResponsiveReactGridLayout
        key="responsiveGridId"
        layouts={layouts}
        onBreakpointChange={this.onBreakpointChange}
        onLayoutChange={this.onLayoutChange}

        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}

        onDragStop={this.onDragStop}
        onDragStart={this.onDragStart}
        onDrag={this.onDrag}


        draggableCancel=".MuiButtonBase-root"

            // WidthProvider option
        measureBeforeMount={false}

        {...gridConfig}
      >
        {this.getAllDivs()}
              </ResponsiveReactGridLayout>,
      fabButtons
      ];
    }
}

// const type = obj => Object.prototype.toString.call(obj);

// ResponsiveGrid.propTypes = {
//   gridConfig: PropTypes.object.isRequired,
//   // layouts is an object mapping breakpoints to layouts.
//   // e.g. {lg: Layout, md: Layout, ...}
//   layouts(props, propName, _componentName) {
//     if (type(props[propName]) !== '[object Object]') {
//       throw new Error(`Layout property must be an object. Received: ${type(props[propName])}`);
//     }
//     Object.keys(props[propName]).forEach((key) => {
//       if (!(key in props.gridConfig.breakpoints)) {
//         throw new Error('Each key in layouts must align with a key in breakpoints.');
//       }
//       validateLayout(props.layouts[key], `layouts.${key}`);
//     });
//   },
//   elements: PropTypes.array,
//
//   showSaveLayoutsButton: PropTypes.bool,
//   saveLayouts: PropTypes.func
// };

// ResponsiveGrid.defaultProps = {
//   gridConfig: {
//     // draggableHandle: '.dragHeader',
//     draggableHandle: '.dragHeader',
//     className: 'responsive-grid-layout',
//     rowHeight: 175,
//     // currentBreakpoint: this.previousLayoutBreakpoint,
//     // Various layout that can be present on windows size change
//     cols: {
//       lg: 5, md: 4, sm: 3, xs: 2, xxs: 1
//     },
//     // cols: {lg: 3, md: 2, sm: 1},
//     // The breaking layout
//     breakpoints: {
//       lg: 1800, md: 1400, sm: 1100, xs: 720, xxs: 0
//     },
//     // breakpoints: {lg: 1800, md: 1100, sm: 0}
//     // ,sizeParameter: {
//     //     maxH: undefined,
//     //     maxW: undefined,
//     //     minH: undefined,
//     //     minW: undefined
//     // },
//     // moveParameter: {
//     //     isDraggable: true,
//     //     isResizable: false,
//     //     static: false
//     // }
//     isDraggable: true,
//     isResizable: true
//   },
//   layouts: {
//     lg: [], md: [], sm: [], xs: [], xxs: []
//   },
//
//   elements: [],
//
//   showSaveLayoutsButton: false
// };

export default withStyles(responsiveGridLayoutStyle)(ResponsiveGrid);

/**
 * Validate a layout. Throws errors.
 *
 * @param  {Array}  layout        Array of layout items.
 * @param  {String} [contextName] Context name for errors.
 * @throw  {Error}                Validation error.
 */
// function validateLayout(layout: ILayoutElement[], contextName: string) {
//   contextName = contextName || 'Layout';
//   const subProps = ['x', 'y', 'w', 'h'];
//   if (!Array.isArray(layout)) throw new Error(`${contextName} must be an array!`);
//   for (let i = 0, len = layout.length; i < len; i++) {
//     const item = layout[i];
//     for (let j = 0; j < subProps.length; j++) {
//       if (typeof item[subProps[j]] !== 'number') {
//         if (j === 1) {
//           item[subProps[j]] = Infinity;
//         } else {
//           throw new Error(`ReactGridLayout: ${contextName}[${i}].${subProps[j]} must be a number!`);
//         }
//       }
//     }
//     if (item.i && typeof item.i !== 'string') {
//       throw new Error(`ReactGridLayout: ${contextName}[${i}].i must be a string!`);
//     }
//     if (item.static !== undefined && typeof item.static !== 'boolean') {
//       throw new Error(`ReactGridLayout: ${contextName}[${i}].static must be a boolean!`);
//     }
//   }
// }
