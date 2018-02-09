import { imageResolver } from "./imgSettings";

export const getUrl = (node, image) => {
    const { width, height } = image;
    let calcWidth = width;
    if(!calcWidth){
        calcWidth = Math.floor(node.offsetWidth, 250);     
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

const resolutionValue = (val) => {
    const realPixelRatio = Math.floor(window.devicePixelRatio);
    return (realPixelRatio || 1) > 1 ? val * realPixelRatio : val;
}