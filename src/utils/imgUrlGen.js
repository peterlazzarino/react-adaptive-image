import { imageResolver } from "./imgSettings";

export const getUrl = (node, image) => {
    const { width, height } = image;
    let calcWidth = width;
    if(!calcWidth){
        calcWidth = Math.max(node.offsetWidth, 250);     
    }
    const finalWidth = resolutionValue(calcWidth)
    //image magick will resize image to aspect ratio if 0 is given as a height parameter.
    const finalHeight = height ? resolutionValue(height) : 0;
    return imageResolver(Object.assign(
        {}, 
        image,
        { 
            width: finalWidth, 
            height: finalHeight 
        }
    ));
}

export const getStaticUrl = (image) => {
    if(!image.width){
        console.warn("react-adaptive-image: You must provide a width to server render src attributes or use preload")
    }
    return imageResolver(image);
}

const resolutionValue = (val) => {
    const realPixelRatio = Math.floor(window.devicePixelRatio);
    return (realPixelRatio || 1) > 1 ? val * realPixelRatio : val;
}