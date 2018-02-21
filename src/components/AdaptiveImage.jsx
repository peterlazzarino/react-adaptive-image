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
    };

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            src: null
        }
    }
    
    componentDidMount(){
        if(!this.props.preLoad && !this.props.width){
            register(this);
        }
        else{
            const { id, width, height, fileName, quality, altText } = this.props;
            const image = { id, width, height, fileName, quality, altText };
            if(!canUseDOM){
                this.setState({
                    src: getStaticUrl(image)
                })                
            }
            this.setState({
                src: getUrl(ReactDOM.findDOMNode(this), image),
                visible: true
            })
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
};

export default AdaptiveImage;