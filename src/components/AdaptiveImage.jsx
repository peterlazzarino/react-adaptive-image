import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { register, deregister } from "../utils/clientEvents";
import { getUrl, getStaticUrl } from "../utils/imgUrlGen";
import Image from "./Image";
import BackgroundImage from "./BackgroundImage";

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
        this.loadImage = this.loadImage.bind(this);
        this.handleClientLoad = this.handleClientLoad.bind(this);
        this.handleServerLoad = this.handleServerLoad.bind(this);
    }

    componentDidMount(){        
        this.loadImage(this.props); 
    }

    componentWillUnmount(){
        deregister(this.props.id);        
    }
    
    componentWillReceiveProps(nextProps) {
        if(this.props.fileName != nextProps.fileName || this.props.id != nextProps.id){
            deregister(this.props.id);
            this.loadImage(nextProps);    
        }
    }  
    
    loadImage(props){
        const { id, height, preLoad, onShow, fileName, width, quality, altText } = props;
        const image = { id, width, height, fileName, quality, altText };
        if(canUseDOM){
            this.handleClientLoad(image);
        }        
        else{
            this.handleServerLoad(image)
        }
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
    
    render(){
        const { visible, src } = this.state; 
        const { altText, backgroundImage, itemProp, className } = this.props;
        const ImgEl = backgroundImage ? BackgroundImage : Image;
        const hideImage = !visible || !src;
        const imgSrc = hideImage ? null : src;
        return (
            <ImgEl src={imgSrc} alt={altText} itemProp={itemProp} className={className} />
        )
    }
}

AdaptiveImage.propTypes = {
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
    src: PropTypes.string,
    backgroundImage: PropTypes.bool
};

export default AdaptiveImage;