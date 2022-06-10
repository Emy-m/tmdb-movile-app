import {SafeAreaView} from 'react-native';
import React from 'react';
import Detail from '../Detail';

const DetailScreen = ({route}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Detail id={route.params.id} />
    </SafeAreaView>
  );
};

export default DetailScreen;
