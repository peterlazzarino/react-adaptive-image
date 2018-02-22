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
    }
    
    componentDidMount(){
        const { id, height, preLoad, onShow, fileName, width, quality, altText } = this.props;
        const image = { id, width, height, fileName, quality, altText };
        if(canUseDOM){
            if(!preLoad){
                register(this, onShow);
            }
            else{                
                const src = getUrl(ReactDOM.findDOMNode(this), image);
                this.setState({
                    src: src,
                    visible: true
                }) 
                onShow(src);
            }
        }        
        else{
            if(preLoad){
                const src = getStaticUrl(image);
                this.setState({
                    src: src,
                    visible:true
                })           
                onShow(src);     
            }
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
    onShow: PropTypes.func
};

export default AdaptiveImage;