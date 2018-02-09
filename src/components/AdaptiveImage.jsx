import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { register } from "../Utils/clientEvents"
import { getUrl } from "../Utils/imgUrlGen"
import { clientOnly } from "client-component";

@clientOnly
class AdaptiveImage extends React.Component{    
    static defaultProps = {
        quality: 80,
        fileExtension: "default",
        fileExtension: "jpg"
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
            const image = { id, width, height, fileName, quality, fileExtension, altText } = this.props;
            this.src = getUrl(ReactDOM.findDOMNode(this), image);
            this.visible = true;
        }
    }

    render(){
        if(!this.visible || !this.src){
            let noscript = null;
            if(this.props.placeholder){
                return placeholder;
            }
            return (
                <React.Fragment>
                    <img className={this.props.className} />
                </React.Fragment>
            )
        }
        return (
            <img src={this.src} className={this.props.className} />
        )
    }
}

AdaptiveImage.propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.string,
    fileName: PropTypes.string,
    quality: PropTypes.number,
    className: PropTypes.string,
    preLoad: PropTypes.bool,
    fileExtension: PropTypes.string,
    altText: PropTypes.string,
    scrollThreshold: PropTypes.number,
    placeholder: PropTypes.node
};

export default AdaptiveImage;