export let imageSettings = {
    noWidthReplacementSize: 200,
    maxWidth: 1366,
    resizeBreakpoints: [330, 480, 768, 1100, 1920, 2250],
    lazyScrollThreshold: 300
}

export let imageResolver = (image) => {
    return `/${image.id}.${image.caption}`;
}

export const initImages = (settings) => {
    imageResolver = settings.imageResolver;
    imageSettings = Object.assign({}, imageSettings, settings.imageSettings);    
}