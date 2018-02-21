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
        const { preLoad, width, onShow } = this.props;
        if(!preLoad && !width){
            register(this, onShow);
        }
        else{
            const { id, height, fileName, quality, altText } = this.props;
            const image = { id, width, height, fileName, quality, altText };
            let src = "";
            if(!canUseDOM){
                src = getStaticUrl(image);
                this.setState({
                    src: src,
                    visible:true
                })                
            }
            else{
                src = getUrl(ReactDOM.findDOMNode(this), image);
                this.setState({
                    src: src,
                    visible: true
                })
            }
            onShow(src);
        }
    }

    render(){
        const { visible, src } = this.state; 
        if(!visible || !src){
            return (
                <img className={this.props.className} />
            )
        }
        return (
            <img src={src} className={this.props.className} />
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
    scrollThreshold: PropTypes.number,
    onShow: PropTypes.func
};

export default AdaptiveImage;