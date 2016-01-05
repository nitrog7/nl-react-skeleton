import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import DemoButton from 'components/DemoButton';

let expect = require('chai').expect;
let assert = require('assert');

describe('DemoButton', () => {
  it('(Meta) Should have a test that works with Mocha expectations.', () => {
    // Render a component
    let component = TestUtils.renderIntoDocument(<DemoButton/>);

    // Verify component
    expect(component).to.be.ok;
  });
});
