import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { register } from "../utils/clientEvents"
import { getUrl } from "../utils/imgUrlGen"
import { clientOnly } from "client-component";

@clientOnly
class AdaptiveImage extends React.Component{    
    static defaultProps = {
        quality: 80,
        fileName: "image.jpg",
    };

    constructor(props){
        super(props);
        this.visible = false;
        this.src = null;
    }
    
    componentDidMount(){
        if(!this.props.preLoad){
            register(this);
        }
        else{
            const { id, width, height, fileName, quality, altText } = this.props;
            const image = { id, width, height, fileName, quality, altText };
            this.src = getUrl(ReactDOM.findDOMNode(this), image);
            this.visible = true;
        }
    }

    render(){
        if(!this.visible || !this.src){
            let noscript = null;
            return (
                <img className={this.props.className} />
            )
        }
        return (
            <img src={this.src} className={this.props.className} />
        )
    }
}

AdaptiveImage.propTypes = {
    id: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.string,
    fileName: PropTypes.string.isRequired,
    quality: PropTypes.number,
    className: PropTypes.string,
    preLoad: PropTypes.bool,
    altText: PropTypes.string,
    scrollThreshold: PropTypes.number,
};

export default AdaptiveImage;