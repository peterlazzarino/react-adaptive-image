import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { register } from "../utils/clientEvents"
import { getUrl, getStaticUrl } from "../utils/imgUrlGen"

const canUseDOM = typeof window !== "undefined";

class AdaptiveImage extends React.Component{    
    static defaultProps = {
        quality: 80,
        fileName: "image.jpg",
        onShow: () => {}
    };

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            src: null
        }
        this.handleClientLoad = this.handleClientLoad.bind(this);
        this.handleServerLoad = this.handleServerLoad.bind(this);
    }

    handleServerLoad(image){
        const { preLoad, onShow, src } = this.props;
        if(src){
            this.showImage(src);
        }
        else if(preLoad){
            this.showImage(getStaticUrl(image));
        }
    }

    handleClientLoad(image){
        const { preLoad, onShow, src } = this.props;
        if(src){
            this.showImage(src);
        }
        else if(!preLoad){
            register(this, onShow);
        }
        else{                
            const src = getUrl(ReactDOM.findDOMNode(this), image);
            this.showImage(src);
        }
    }

    showImage(src){
        const { onShow } = this.props;        
        this.setState({
            src: src,
            visible: true
        }) 
        onShow(src);
    }
    
    componentDidMount(){
        const { id, height, preLoad, onShow, fileName, width, quality, altText } = this.props;
        const image = { id, width, height, fileName, quality, altText };
        if(canUseDOM){
            this.handleClientLoad(image);
        }        
        else{
            this.handleServerLoad(image)
        }
    }

    render(){
        const { visible, src } = this.state; 
        const { altText, itemProp } = this.props;
        if(!visible || !src){
            return (
                <img alt={altText} itemProp={itemProp} className={this.props.className} />
            )
        }
        return (
            <img src={src} alt={altText} itemProp={itemProp} className={this.props.className} />
        )
    }
}

AdaptiveImage.propTypes = {
    id: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    fileName: PropTypes.string.isRequired,
    quality: PropTypes.number,
    className: PropTypes.string,
    preLoad: PropTypes.bool,
    altText: PropTypes.string,
    itemProp: PropTypes.string,
    scrollThreshold: PropTypes.number,
    onShow: PropTypes.func,
    src: PropTypes.string
};

export default AdaptiveImage;