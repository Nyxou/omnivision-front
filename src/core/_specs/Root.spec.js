import React from 'react';
import { shallow } from 'enzyme';

import Root from '../components/Root';

describe('Root component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Root />);
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('renders the expected component', () => {
    expect(component.find('Provider').length).toEqual(1);
    expect(component.find('BrowserRouter').length).toEqual(1);
    expect(component.find('Connect(App)').length).toEqual(1);
    expect(component.find('Switch').length).toEqual(1);
    expect(component.find('Route').length).toEqual(5);
  });
});
