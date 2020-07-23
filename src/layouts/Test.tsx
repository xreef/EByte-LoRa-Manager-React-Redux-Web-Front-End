import React from 'react';
import logo from '../logo.svg';
import './Test.css';

import { connect } from 'react-redux';

import { RootState } from '../redux/reducers';
import { versionSelectors } from '../redux/reducers/version';

import { setVersion } from '../redux/actions';

// interface StateProps {
//     version: string,
//     date: string
// }
//
// interface DispatchProps {
//     setVersion: VersionActions
// }
//
interface OwnProps {
    backgroundColor: string;
}
//
// type Props = StateProps & DispatchProps & OwnProps

const mapState = (state: RootState) => ({
  version: versionSelectors.appVersion(state),
  date: versionSelectors.appDate(state),
});

const mapDispatch = {
  setVersion,
};

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch

type Props = StateProps & DispatchProps & OwnProps

class Test extends React.Component<Props, { version: string }> {
  constructor(props: Props) {
    super(props);

    this.state = { version: props.version };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit
            {' '}
            <code>src/App.tsx</code>
            {' '}
            and save to reload.
            {' '}
            {this.props.version}
            {' '}
            {this.state.version}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div onClick={() => this.props.setVersion('0.0.2', '123')}> Ciao </div>
          {/* <div onClick={() => this.props.setVersion({version: '0.0.2', date: '123'})}> Ciao </div> */}

        </header>
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch,
)(Test);
//
// export default Test;
