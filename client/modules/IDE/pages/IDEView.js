import React, { PropTypes } from 'react';
import Editor from '../components/Editor';
import PreviewFrame from '../components/PreviewFrame';
import Toolbar from '../components/Toolbar';
import Preferences from '../components/Preferences';
import Nav from '../../../components/Nav';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FileActions from '../actions/files';
import * as IDEActions from '../actions/ide';
import * as PreferencesActions from '../actions/preferences';
import * as ProjectActions from '../actions/project';

class IDEView extends React.Component {
  componentDidMount() {
    if (this.props.params.project_id) {
      const id = this.props.params.project_id;
      this.props.getProject(id);
    }
  }

  render() {
    return (
      <div className="ide">
        <Nav
          user={this.props.user}
          createProject={this.props.createProject}
          saveProject={this.props.saveProject}
        />
        <Toolbar
          className="Toolbar"
          isPlaying={this.props.ide.isPlaying}
          startSketch={this.props.startSketch}
          stopSketch={this.props.stopSketch}
          projectName={this.props.project.name}
          setProjectName={this.props.setProjectName}
          openPreferences={this.props.openPreferences}
          isPreferencesVisible={this.props.preferences.isVisible}
        />
        <Preferences
          isVisible={this.props.preferences.isVisible}
          closePreferences={this.props.closePreferences}
          increaseFont={this.props.increaseFont}
          decreaseFont={this.props.decreaseFont}
          fontSize={this.props.preferences.fontSize}
        />
        <Editor
          content={this.props.file.content}
          updateFile={this.props.updateFile}
          fontSize={this.props.preferences.fontSize}
        />
        <PreviewFrame
          content={this.props.file.content}
          head={
            <link type="text/css" rel="stylesheet" href="/preview-styles.css" />
          }
          isPlaying={this.props.ide.isPlaying}
        />
      </div>
    );
  }
}

IDEView.propTypes = {
  params: PropTypes.shape({
    project_id: PropTypes.string
  }),
  getProject: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  createProject: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
  ide: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired
  }).isRequired,
  startSketch: PropTypes.func.isRequired,
  stopSketch: PropTypes.func.isRequired,
  project: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  setProjectName: PropTypes.func.isRequired,
  openPreferences: PropTypes.func.isRequired,
  preferences: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired
  }).isRequired,
  closePreferences: PropTypes.func.isRequired,
  increaseFont: PropTypes.func.isRequired,
  decreaseFont: PropTypes.func.isRequired,
  file: PropTypes.shape({
    content: PropTypes.string.isRequired
  }).isRequired,
  updateFile: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    file: state.file,
    ide: state.ide,
    preferences: state.preferences,
    user: state.user,
    project: state.project
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
    FileActions,
    ProjectActions,
    IDEActions,
    PreferencesActions),
  dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IDEView);
