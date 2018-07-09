import React from "react";
import PropTypes from "prop-types";

class BackgroundImage extends React.Component{
    render(){
        const { src, altText, className } = this.props;
        const imageStyle = src && {
            backgroundImage: `url(${src})`
        };
        return (
            <div style={imageStyle} aria-label={altText} className={className} />
        )
    }
}

BackgroundImage.propTypes = {
    className: PropTypes.string,
    altText: PropTypes.string,
    src: PropTypes.string
};

export default BackgroundImage;