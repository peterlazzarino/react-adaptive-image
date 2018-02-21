export const isValidDOMElement = (node) => {
    //if a user is hidden by css or otherwise, the offset parent will be null https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent 
    if(!node.offsetParent){
        return false;
    }
    return true;
}