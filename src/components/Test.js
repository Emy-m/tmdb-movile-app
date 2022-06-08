import {SafeAreaView, FlatList, TouchableOpacity, Text} from 'react-native';
import ItemSeparator from './ItemSeparator';
import React, {useState, useEffect} from 'react';
import * as env from '../environment/development';
import {StyleSheet, View} from 'react-native';

const Test = () => {
  const [movies, setMovies] = useState([]);
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
    fetchMovies();
  }, []);

  function fetchMovies() {
    setError(null);
    setLoading(true);
    setMovies([]);

    fetch(env.API_URL + '/movie/popular?api_key=' + env.API_KEY)
      .then(response => response.json())
      .then(json => {
        setMovies(json.results);
        setLoading(false);
      });
  }

  function fetchConfig() {
    fetch(env.CONFIGURATION_URL + env.API_KEY)
      .then(response => response.json())
      .then(json => setConfig(json));
  }

  function handleRefresh() {
    fetchMovies();
  }

  const renderItemComponent = movie => (
    <TouchableOpacity>
      <Text>{movie.title}</Text>
      <Text>{movie.release_date}</Text>
      <Text>{movie.vote_average}</Text>
      <Text>{movie.id}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={movies}
        renderItem={movie => renderItemComponent(movie.item)}
        keyExtractor={movie => movie.id}
        ItemSeparatorComponent={() => <ItemSeparator />}
        refreshing={loading}
        onRefresh={handleRefresh}></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default Test;
