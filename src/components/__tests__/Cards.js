import Cards from '../Card/Cards'
import React from 'react';
import renderer from 'react-test-renderer';

describe('The Cards Component', () => {
   it(`it should add new contact`, () => {
    const component = renderer.create(
        <Cards />
    )
   }) 
})