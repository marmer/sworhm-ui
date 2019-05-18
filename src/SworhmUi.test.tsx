import React from 'react';
import ReactDOM from 'react-dom';
import SworhmUi from './SworhmUi';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SworhmUi/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
