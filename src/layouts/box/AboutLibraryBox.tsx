import React, {FunctionComponent} from "react";
import GridContainer from "../../component/grid/GridContainer";
import GridItem from "../../component/grid/GridItem";
import Card from "../../component/card/Card";
import CardAvatar from "../../component/card/CardAvatar";
import CardBody from "../../component/card/CardBody";
import withStyles from "@material-ui/core/styles/withStyles";
import basicsStyle from "../../component/style/basicsStyle";
import avatar from '../../resources/images/favicon/android-icon-144x144.png';
import siteLogo from '../../resources/images/logo.jpg';
import {injectIntl} from "react-intl";
import Button from './../../component/customButtons/Button';

interface Props {
    classes: any,
    intl: any
}

const AboutLibraryBox: FunctionComponent<Props> = ({ classes }) => (
    <div>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card profile>
                    <CardAvatar profile>
                        <a href="#mischianti"  onClick={e => e.preventDefault()}>
                            <img src={avatar} alt="..." />
                        </a>
                    </CardAvatar>
                    <CardBody profile>
                        <h6 className={classes.cardCategory}>Library</h6>
                        <h4 className={classes.cardTitle}>EByte Lora e32</h4>
                        <h4 className={classes.cardTitle}>MIT License</h4>
                        <p className={classes.description}>
                            renzo.mischianti@gmail.com
                        </p>
                        <p className={classes.description}>
                            <a href="https://www.mischianti.org/category/my-libraries/lora-e32-devices/">
                                <img
                                    src={siteLogo}
                                    style={{
                                        width: '50px',
                                        'verticalAlign': 'middle',
                                        'paddingRight': '10px'
                                    }
                                    }
                                    alt="A blog of digital electronics and programming (Bumblebee can't fly)"
                                /><br/>
                                https://www.mischianti.org/category/my-libraries/lora-e32-devices/
                            </a>
                        </p>
                         <Button color="primary" round link="www.mischianti.org">
                         Follow
                         </Button>
                    </CardBody>
                </Card>
            </GridItem>

        </GridContainer>
    </div>
);

// export default About;
export default withStyles(basicsStyle)(injectIntl(AboutLibraryBox));
