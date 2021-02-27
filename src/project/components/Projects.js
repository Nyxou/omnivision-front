// @flow
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { 
  Container,
  Row,
  Col,
  Table
} from 'react-bootstrap';

import Spinner from '../../shared/Spinner'

import * as coreConstants from '../../core/constants';

import type { Project } from '../models';
import * as projectsSelectors from '../selectors';

import '../styles/Projects.scss';

const { ROUTING } = coreConstants;

type Props = {
  projects: array<Project>,
  isLoading: boolean
};

const Projects = (props: Props) => {
  const { projects, isLoading } = props;
  let history = useHistory();

  const redirect = (projectId) => {
    history.push(ROUTING.PROJECT.PATH.replace(':projectId', projectId));
  };

  if (isLoading) {
    return (
      <Container fluid className="projects">
        <Row>
          <Col xs={12}>
            <Spinner />
          </Col>
        </Row>
      </Container>
    );
  }

  const projectBlocks = projects.map((project) => {
    const startProject = moment(project.startDate).format('DD.MM.YYYY');
    const endProject = moment(project.endDate).format('DD.MM.YYYY');

    return (
      <tr key={project.id} onClick={() => redirect(project.id)} className="tr-project">
        <td>{ project.name }</td>
        <td>{ project.description }</td>
        <td>{ startProject }</td>
        <td>{ endProject }</td>
      </tr>
    );
  });

  return (
    <Container fluid className="projects">
      <Row>
        <Col xs={12}>
          <h1>Liste des Projets</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Début</th>
                <th>Fin</th>
              </tr>
            </thead>
            <tbody>
              { projectBlocks }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

const mapState = (state: Object) => ({
  projects: projectsSelectors.projectsCollectionSelector(state),
});

export { Projects };
export default connect(mapState)(Projects);
