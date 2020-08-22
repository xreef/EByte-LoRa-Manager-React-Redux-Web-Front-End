import React, {FunctionComponent} from "react";
import AboutBox from "../layouts/box/AboutBox";
import GridContainer from "../component/grid/GridContainer";
import GridItem from "../component/grid/GridItem";
import AboutProgramBox from "../layouts/box/AboutProgramBox";
import AboutLibraryBox from "../layouts/box/AboutLibraryBox";

const About: FunctionComponent = () => (
    <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
            <AboutBox/>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
            <AboutLibraryBox/>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
            <AboutProgramBox/>
        </GridItem>
    </GridContainer>
    );

// export default About;
export default About;
