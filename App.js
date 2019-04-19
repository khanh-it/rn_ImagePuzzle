import React, { Component } from "react";
import { Provider } from 'react-redux';
// https://github.com/rt2zz/redux-persist
import { PersistGate } from 'redux-persist/integration/react';
// +++
import { store, persistor } from './app/configs/store';

// Component(s)
import RootScreen from './app/components/RootScreen';

/**
 * @class App
 */
export default class App extends Component
{
  constructor(props)
  {
    super(props);

    // Init state
    this.state = {}
  }

  render()
  {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
    );
  }
}
