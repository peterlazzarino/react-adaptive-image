import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};

Enzyme.configure({ adapter: new Adapter() });
