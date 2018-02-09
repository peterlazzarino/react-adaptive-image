import detectPassiveEvents from 'detect-passive-events';
import { getUrl } from "./imgUrlGen";
import { imageSettings } from "./imgSettings";
import ReactDOM from "react-dom";

//use capture by default
let eventSettings = true;

if (detectPassiveEvents.hasSupport === true) {
    eventSettings = { capture: false, passive: true };
}

let listeners = []
let pending = [];

export const register = (component) => {
    if(listeners.length == 0){
        bindEvents();
    }
    listeners.push(component);
    tryShowImage(component)
}

const bindEvents = () => {    
    window.addEventListener("scroll", checkVisible, eventSettings);
}

const checkVisible = () => {
    for (let i = 0; i < listeners.length; ++i) {
        const listener = listeners[i];
        tryShowImage(listener);
    }
    purgePending();
}

const tryShowImage = (component) => {
    const node = ReactDOM.findDOMNode(component);
    if(node && shouldBeShown(node)){
        const { id, width, height, fileName, quality, fileExtension, altText } = component.props;
        const image = { id, width, height, fileName, quality, fileExtension, altText };
        component.src = getUrl(node, image);
        component.visible = true;
        component.forceUpdate();
        pending.push(component);
    }
}

const shouldBeShown = (node) => {
    //if a user is hidden by css or otherwise, the offset parent will be null https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent  
    if(!node.offsetParent){
        return false;
    }
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docViewBottom = scrollTop + window.outerHeight;
    const elemTop = getYPosition(node);
    return (elemTop - imageSettings.lazyScrollThreshold) <= docViewBottom;
}

const getYPosition = (node) => {
    let yPosition = 0;
    let el = node;
    while(el) {
        yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
        el = el.offsetParent;
    }

    return yPosition;
}

const purgePending = () => {
    pending.forEach((component) => {
        const index = listeners.indexOf(component);
        if (index !== -1) {
            listeners.splice(index, 1);
        }
    });

    pending = [];
}