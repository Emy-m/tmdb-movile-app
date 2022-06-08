/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {SafeAreaView} from 'react-native';
import Test from './src/components/Test';
import Detail from './src/components/Detail';

const App: () => Node = () => {
  return (
    <SafeAreaView>
      <Detail />
    </SafeAreaView>
  );
};

export default App;
