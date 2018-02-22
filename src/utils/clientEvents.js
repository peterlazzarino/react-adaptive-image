import detectPassiveEvents from 'detect-passive-events';
import { getUrl } from "./imgUrlGen";
import { imageSettings } from "./imgSettings";
import { isValidDOMElement } from "./elValidation";
import ReactDOM from "react-dom";

//use capture by default
let eventSettings = true;

if (detectPassiveEvents.hasSupport === true) {
    eventSettings = { capture: false, passive: true };
}

let listeners = []
let pending = [];

export const register = (component, callback) => {
    if(listeners.length == 0){
        bindEvents();
    }
    listeners.push({ 
        component: component, 
        callback: callback
    });
    tryShowImage(component, callback)
}

export const deregister = (id) => {    
    removeListener(id);
}

const bindEvents = () => {    
    window.addEventListener("scroll", checkVisible, eventSettings);
}

const checkVisible = () => {
    for (let i = 0; i < listeners.length; ++i) {
        const listener = listeners[i];
        tryShowImage(listener.component, listener.callback);
    }
    purgePending();
}

const tryShowImage = (component, callback) => {
    const node = ReactDOM.findDOMNode(component);
    if(node && shouldBeShown(node)){
        const { id, width, height, fileName, quality, altText } = component.props;
        const image = { id, width, height, fileName, quality, altText };
        const nextUrl = getUrl(node, image);
        component.setState({
            src: nextUrl,
            visible: true
        });
        component.forceUpdate();
        callback(nextUrl);
        pending.push(component);
    }
}

const shouldBeShown = (node) => {
    if(!isValidDOMElement(node)){
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

const removeListener = (id) => {    
    const index = listeners.findIndex(x => x.component.props.id == id);
    if (index !== -1) {
        listeners.splice(index, 1);
    }
}

const purgePending = () => {
    pending.forEach((component) => {        
        removeListener(component.props.id);
    });

    pending = [];
}