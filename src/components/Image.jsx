import React from "react";
import PropTypes from "prop-types";

class Image extends React.Component{
    render(){
        const { src, altText, itemProp, className } = this.props;
        return (
            <img src={src} alt={altText} itemProp={itemProp} className={className} />
        )
    }
}

Image.propTypes = {
    className: PropTypes.string,
    altText: PropTypes.string,
    src: PropTypes.string,
    itemProp: PropTypes.string
};

export default Image;