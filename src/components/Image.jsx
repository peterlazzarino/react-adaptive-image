import React from "react";

class Image extends React.Component{
    render(){
        return (
            <img src={src} alt={altText} itemProp={itemProp} className={this.props.className} />
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