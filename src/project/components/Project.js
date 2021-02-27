// @flow
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { 
  Container,
  Row,
  Col,
  Table,
  Jumbotron,
  Alert
} from 'react-bootstrap';

import type { Project as TypeProject }  from '../models';
import * as projectsSelectors from '../selectors';

import '../styles/Project.scss';

type State = {
  project: TypeProject
}

const Project = (state: State) => {
  const { project } = state;

  if (typeof project === 'undefined') {
    return (
      <Container fluid className="project">
        <Row>
          <Col xs={12}>
            <Alert variant="danger">Aucun projet trouvé.</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  const projectRessourcesBlocks = project.resources.map((resource, indexResource) => {
    return (
      <tr key={project.id + '-' + indexResource}>
        <td>{ resource.name }</td>
        <td>{ resource.description }</td>
        <td>{ resource.days }</td>
      </tr>
    );
  });

  return (
    <Container fluid className="project">
      <Row>
        <Col xs={12}>
          <h1>{ project.name }</h1>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Jumbotron>
            <Row>
              <Col xs={12} md={6}>
                <b>Descritption :</b> { project.description }
              </Col>
              <Col xs={12} md={6}>
                <b>Nb de jours :</b> { project.days }
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <b>Début :</b> { moment(project.startDate).format('DD.MM.YYYY') }
              </Col>
              <Col xs={12} md={6}>
                <b>Fin :</b> { moment(project.endDate).format('DD.MM.YYYY') }
              </Col>
            </Row>
          </Jumbotron>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <h3>Liste des ressources</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
        <Table responsive hover>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Nb de jours</th>
              </tr>
            </thead>
            <tbody>
              { projectRessourcesBlocks }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  project: projectsSelectors.projectsCollectionSelector(state).find(
    (project) => project.id.toString() === ownProps.match.params.projectId
  )
});

export { Project };
export default connect(mapStateToProps)(Project);
