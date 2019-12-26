import React, { Component } from 'react';
import './css/App.css';
import BlockComponent from './BlockComponent.js';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const styles = theme => ({
    app: {
        paddingTop: "5vmax"
    },
    header: {
        position: "fixed",
        height: "auto",
        padding: "0.5vmax 0",
        top: 0
    },
    sitename: {
        flexGrow: 1,
        fontFamily: "'Amatic SC', cursive",
        fontSize: "2.5vmax",
        fontWeight: "bold"
    },
    imageClass: {
        height: "2.5vmax"
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place: undefined
        };
        this.clickPlace = this.clickPlace.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }
    componentDidMount() {
        let blocks = document.getElementsByClassName("parallaxClass");
        function parallaxImg () {
            [].forEach.call(blocks, function (el) {
                let img = el;
                let imgParent = img.parentElement;
                let speed = img.getAttribute('speed') || -1;
                let winY = window.pageYOffset;
                let imgY = imgParent.getBoundingClientRect().top + winY;
                let winH = window.screen.height;
                let parentH = imgParent.clientHeight ;
                let winBottom = winY + winH;
                let imgPercent = 0;
                if (winBottom > imgY && winY < imgY + parentH) {
                    let imgBottom = ((winBottom - imgY) * speed);
                    let imgTop = winH + parentH;
                    imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
                }
                img.style.bottom = imgPercent + '%';
                img.style.transform = 'translate(-50%, ' + imgPercent + '%)';
            });

        }
        window.onload = function() {
            parallaxImg();
        };
        window.onscroll = function() {
            parallaxImg();
        };
    }
    savePDF = () => {
        html2canvas(document.querySelector("#formBlock"))
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0, "210", "297");
                pdf.save("download.pdf");
            })
        ;
    };
    clickPlace = (country) => {
        this.setState({place: country});
    };
    renderForm() {
        return <BlockComponent id="formBlock" ComponentType="form" content="Worksheet" speed="-1" bg="_MG_1430.JPG" defaultPlace={this.state.place} savePDF={this.savePDF} />
    };
    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.app}>
                <AppBar position="static" color="default" className={classes.header}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.sitename}>
                            Adventure Counter
                        </Typography>
                        <div>
                            <a href="https://www.instagram.com/adventure_counter/">
                                <img alt="Instagram" src="/img/inst.png" className={classes.imageClass} />
                            </a>
                        </div>
                    </Toolbar>
                </AppBar>
                <BlockComponent content="1" speed="1" bg="_MG_1339.JPG" />
                <BlockComponent content="2" speed="0.8" bg="_MG_1374.JPG" />
                {this.renderForm()}
                <BlockComponent content="3" speed="-0.5" bg="_MG_2128.JPG" />
                <BlockComponent content="4" speed="0.5" bg="_MG_2277.JPG" />
                <BlockComponent content="5" speed="0.75" bg="_MG_2327.JPG" />
                <BlockComponent ComponentType="comments" content="Comments" speed="-0.75" bg="_MG_2365.JPG" />
                <BlockComponent ComponentType="gallery" content="Gallery" speed="1" bg="_MG_2389.JPG" clickPlace={this.clickPlace} />
                <BlockComponent ComponentType="map" content="Map" speed="-1" bg="_MG_2443.JPG" />
                <BlockComponent content="6" speed="1" bg="DSC_1741.JPG" />
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
