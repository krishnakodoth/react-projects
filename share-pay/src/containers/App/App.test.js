import React from 'react';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<h1>Test</h1>, div);
    ReactDOM.unmountComponentAtNode(div);
});
it('Test Add', () => {
    expect(1+2).toBe(3);
  });