import React from 'react';
import { shallow } from 'enzyme';
// import { createMemoryHistory } from "history";

import { Projects } from '../components/Projects';
import * as projectHelpers from '../helpers';
import mockProjects from './mocks/projects.json';

describe('Projects component', () => {
  let component;
  // const history = createMemoryHistory({ initialEntries: ['/'] });

  const props = {
    projects: projectHelpers.parseProjectsCollection(mockProjects),
    // history: history
  };

  beforeEach(() => {
    component = shallow(<Projects {...props} />);
    jest.clearAllMocks();
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('renders the expected component', () => {
    expect(component.find('.projects').length).toEqual(1);
    expect(component.find('table').length).toEqual(1);
    expect(component.find('h1').length).toEqual(1);
    expect(component.find('.tr-project').length).toEqual(mockProjects.length);
  });
});
