import React from 'react';
import { configure, mount } from 'enzyme';
import Dog from './components/Home/Card';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import '@testing-library/jest-dom'

configure({ adapter: new Adapter() });

describe('Dog', ()=>{
  let wrapper;
  beforeEach(() =>{
    wrapper = mount(<Dog name="Juan" temperament="" weight="50-60"/>)
  })
  it('should render a li tag', () => {
    expect(wrapper.find('li')).toHaveLength(1)
    });
  it('should render a h3 ', () => {
      expect(wrapper.find('h3')).toHaveLength(1)
      });
  it('h3 should render the name Juan passed by props', () => {
      expect(wrapper.find("h3").text()).toEqual("Juan");
    })
  it('should render a img tag ', () => {
      expect(wrapper.find('img')).toHaveLength(1)
      });
  it('should render two h5 tags ', () => {
      expect(wrapper.find('h5')).toHaveLength(2)
      });
  it('first h5 should render the word Temperaments:', () => {
      expect(wrapper.find("h5").at(0).text()).toEqual("Temperaments: ");
    })
  it('second h5 should render Weight', () => {
      expect(wrapper.find("h5").at(1).text()).toEqual("Weight: ");
    })
  it('should render two span tags  ', () => {
      expect(wrapper.find('span')).toHaveLength(2)
      });
  it('first span should render None if temperament passed in props is an empty string', () => {
        expect(wrapper.find("span").at(0).text()).toEqual("None");
      })
    it('second span should render weight value defined in props followed by the word kg', () => {
        expect(wrapper.find("span").at(1).text()).toEqual("50-60 kg");
      })
  });