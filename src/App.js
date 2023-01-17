import React, { useEffect, useState } from 'react';
import { Provider } from "react-redux";
import { AppRegistry } from 'react-native';
import configureStore from "./redux/store";
import { initialMode, eventEmitter } from "react-native-dark-mode";
import AppContainer from "./screens/AppContainer";
import { setI18nConfig } from "./Core/localization/IMLocalization";
import * as RNLocalize from "react-native-localize";

const store = configureStore();
const useForceUpdate = () => useState()[1];

const App = props => {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    console.disableYellowBox = true;
    setI18nConfig();
    RNLocalize.addEventListener('change', handleLocalizationChange);
    eventEmitter.on('currentModeChanged', mode => {
      setMode(mode);
    });
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);

  const handleLocalizationChange = () => {
    setI18nConfig();
    useForceUpdate();
  };

  return (
    <Provider store={store}>
      <AppContainer screenProps={{ theme: mode }} />
    </Provider>
  );
};

App.propTypes = {};

App.defaultProps = {};

AppRegistry.registerComponent('App', () => App);

export default App;
