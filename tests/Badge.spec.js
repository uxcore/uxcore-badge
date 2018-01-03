import expect from 'expect.js';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Badge from '../src';

Enzyme.configure({ adapter: new Adapter() });

describe('Uxcore Badge', () => {
    it('should be able to render count with 1 digit', () => {
        const wrapper = mount(<Badge count={3} />);
        const values = wrapper.find('.kuma-badge-count .current');
        const mergedValue = values.map(el => el.text()).join('');

        expect(mergedValue).to.be('3');
    });

    it('should be able to render count with 2 digits', () => {
        const wrapper = mount(<Badge count={23} />);
        const values = wrapper.find('.kuma-badge-count .current');
        const mergedValue = values.map(el => el.text()).join('');

        expect(mergedValue).to.be('23');
    });

    it('should be able to render dot', () => {
        const wrapper = mount(<Badge dot={true} />);
        const dot = wrapper.find('sup.kuma-badge-dot');

        expect(dot).to.have.length(1);
    });

    it('should be able to render text', () => {
        const wrapper = mount(<Badge text={'test123'} />);
        const text = wrapper.find('sup.kuma-badge-count').text();

        expect(text).to.be('test123');
    });

    it('should be able to change count', (done) => {
        const wrapper = mount(<Badge count={23} />);
        wrapper.setProps({ count: 45 });

        setTimeout(() => {
            const values = wrapper.update().find('.kuma-badge-count .current');
            const mergedValue = values.map(el => el.text()).join('');
            expect(mergedValue).to.be('45');
            done();
        }, 10);
    });

    it('should be able to change count without animation', (done) => {
        const wrapper = mount(<Badge count={23} />);
        wrapper.setState({ animationEnabled: false });
        wrapper.setProps({ count: 45 });

        setTimeout(() => {
            const values = wrapper.update().find('.kuma-badge-count .current');
            const mergedValue = values.map(el => el.text()).join('');
            expect(mergedValue).to.be('45');
            done();
        }, 10);
    });
});