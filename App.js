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

const App: () => Node = () => {
  return (
    <SafeAreaView>
      <Test />
    </SafeAreaView>
  );
};

export default App;
