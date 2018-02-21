import AdaptiveImage from "../src/components/AdaptiveImage";
import { initImages } from "../src/utils/imgSettings";
import React from 'react';
import { mount } from 'enzyme';

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
        expect(image.state().src != null);
        expect(image.state().isVisible);
    });

    it('Renders with provided width on mount if preload is true', () => {  
        const image = mount(<AdaptiveImage width={200} preLoad={true} fileName="1.jpg" />);
        expect(image.state().src == "/200/0/1.jpg");
        expect(image.state().isVisible);
    });

    it('Renders with provided width and height mount if preload is true', () => {  
        const image = mount(<AdaptiveImage width={200} height={400} preLoad={true} fileName="1.jpg" />);
        expect(image.state().src == "/200/400/1.jpg");
        expect(image.state().isVisible);
    });

    it('Renders with provided width and height mount if preload is false but width is set', () => {  
        const image = mount(<AdaptiveImage width={200} height={400} fileName="1.jpg" />);
        expect(image.state().src == "/200/400/1.jpg");
        expect(image.state().isVisible);
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
    
    it('Renders without src if preload is false', () => {  
        const image = mount(<div><AdaptiveImage fileName="1.jpg" /></div>);
        expect(image.state().src == null);
        expect(!image.state().isVisible);
    });

});