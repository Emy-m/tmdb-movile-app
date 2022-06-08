import {SafeAreaView, Button, FlatList} from 'react-native';
import React from 'react';
import * as env from '../../environment/development';

const HeaderMovieFilter = ({setFilter, actualFilter}) => {
  const renderItemComponent = filter =>
    filter.name !== actualFilter.name ? (
      <Button
        color="skyblue"
        onPress={() => setFilter(filter.url)}
        title={filter.name}
      />
    ) : null;

  return (
    <SafeAreaView>
      <FlatList
        data={env.MOVIES_PATH}
        renderItem={filter => renderItemComponent(filter.item)}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'skyblue',
        }}
        keyExtractor={filter => filter.name}
        horizontal={true}
      />
    </SafeAreaView>
  );
};

export default HeaderMovieFilter;
