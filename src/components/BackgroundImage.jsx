import React from "react";
import PropTypes from "prop-types";

class BackgroundImage extends React.Component{
    render(){
        const imageStyle = {
            backgroundImage: "url(" + { src } + ")"
        };
        return (
            <div style={imageStyle} aria-label={altText} className={this.props.className} />
        )
    }
}

BackgroundImage.propTypes = {
    className: PropTypes.string,
    altText: PropTypes.string,
    src: PropTypes.string,
    itemProp: PropTypes.string
};

export default BackgroundImage;