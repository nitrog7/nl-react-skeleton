jest.dontMock('../../../src/components/DemoButton');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const DemoButton = require('../../../src/components/DemoButton');

describe('DemoButton', () => {
  it('changes the text after click', () => {
    // Render a checkbox with label in the document
    let component = TestUtils.renderIntoDocument(
      <DemoButton/>
    );

    let node = ReactDOM.findDOMNode(component);

    // Verify label
    expect(node.textContent).toEqual('Demo');
  });
});
