import * as React from 'react';

import Navigation from './src/navigations/Navigations';
import PushController from './src/screens/common-components/push-notification-controller/PushController';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';


interface Props {
}

interface State {
}

export default class App extends React.PureComponent<Props, State> {
  render(): React.ReactNode {
    return (
      <Provider store={store}>
      <PushController/>
      <Navigation />
      </Provider>
    );
  }
};
