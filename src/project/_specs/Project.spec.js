import React from 'react';
import { shallow } from 'enzyme';

import { Project } from '../components/Project';
import * as projectHelpers from '../helpers';
import mockProjects from './mocks/projects.json';

describe('Project component', () => {
  let component;

  const props = {
    projects: projectHelpers.parseProjectsCollection(mockProjects),
    match: {
      params: {
        projectId: '1'
      }
    }
  };

  beforeEach(() => {
    component = shallow(<Project {...props} />);
    jest.clearAllMocks();
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('renders the expected component', () => {
    expect(component.find('.project').length).toEqual(1);
    expect(component.find('h1').length).toEqual(1);
    expect(component.find('h3').length).toEqual(1);
    expect(component.find('table').length).toEqual(1);
    expect(component.find('table tbody tr').length).toEqual(mockProjects[0].resources.length);
  });

  it('renders the expected component (no project found)', () => {
    const localProps = {
      ...props,
      match: {
        params: {
          projectId: 'test'
        }
      }
    };
    component = shallow(<Project {...localProps} />);
    expect(component.find('.project').length).toEqual(1);
    expect(component.find('.alert').length).toEqual(1);
  });
});
