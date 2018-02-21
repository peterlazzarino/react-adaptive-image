import AdaptiveImage from "../src/components/AdaptiveImage";
import { initImages } from "../src/utils/imgSettings";
import React from 'react';
import { mount } from 'enzyme';
import { isValidDOMElement } from '../src/utils/elValidation';

jest.mock('../src/utils/elValidation', () => ({
    isValidDOMElement: jest.fn(() => {
        return {
            offsetParent: true
        }
    })
}))

describe('Preloaded image rendering', () => {

    beforeEach(() => {
        initImages({
            imageResolver: function(img) {
                return `/${img.width}/${img.height}/${img.fileName}`;
            }
        })
    });
  
    it('Renders with src if preload is true', () => {  
        const image = mount(<AdaptiveImage preLoad={true} fileName="1.jpg" />);
        expect(image.state().src).toEqual("/250/0/1.jpg");
        expect(image.state().visible).toBeTruthy();
    });

    it('Renders with provided width on mount if preload is true', () => {  
        const image = mount(<AdaptiveImage width={200} preLoad={true} fileName="1.jpg" />);
        expect(image.state().src).toEqual("/200/0/1.jpg");
        expect(image.state().visible).toBeTruthy();
    });

    it('Renders with provided width and height mount if preload is true', () => {  
        const image = mount(<AdaptiveImage width={200} height={400} preLoad={true} fileName="1.jpg" />);
        expect(image.state().src).toEqual("/200/400/1.jpg");
        expect(image.state().visible).toBeTruthy();
    });

    it('Renders with provided width and height mount if preload is false but width is set', () => {  
        const image = mount(<AdaptiveImage width={200} height={400} fileName="1.jpg" />);
        expect(image.state().src).toEqual("/200/400/1.jpg");
        expect(image.state().visible).toBeTruthy();
    });

  });

  describe('Adaptive image rendering', () => {
    
    beforeEach(() => {
        initImages({
            imageResolver: function(img) {
                return `/${img.width}/${img.height}/${img.fileName}`;
            }
        })
    });
    
    it('Renders with src if preload is false but image is present and above the fold', done => {  
        function callback(src) {
            expect(src).toEqual("/250/0/1.jpg");
            done();
        }
        const image = mount(<AdaptiveImage onShow={callback} fileName="1.jpg" />);
    });

});