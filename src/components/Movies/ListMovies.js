import {FlatList, SafeAreaView} from 'react-native';
import ItemSeparator from '../ItemSeparator';
import React, {useState, useEffect} from 'react';
import * as env from '../../environment/development';
import Movie from './Movie';

const ListMovies = ({route, navigation}) => {
  const [movies, setMovies] = useState([]);
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const filter = env.MOVIES_PATH.find(
    item => item.name === route.params.sortBy,
  );

  useEffect(() => {
    fetchConfig().then(() => fetchMovies());
  }, []);

  function fetchMovies() {
    setError(null);
    setLoading(true);
    setMovies([]);

    fetch(env.API_URL + filter.url + '?api_key=' + env.API_KEY)
      .then(response => response.json())
      .then(json => {
        setMovies(json.results);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

  function fetchConfig() {
    return fetch(env.CONFIGURATION_URL + env.API_KEY)
      .then(response => response.json())
      .then(json => setConfig(json));
  }

  function handleRefresh() {
    fetchMovies();
  }

  const renderItemComponent = movie => (
    <Movie
      movie={movie}
      handleDetail={handleDetail}
      baseUrl={config.images.base_url}
    />
  );

  const handleDetail = movie => {
    navigation.navigate('Detail', {id: movie.id});
  };

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

export default ListMovies;
