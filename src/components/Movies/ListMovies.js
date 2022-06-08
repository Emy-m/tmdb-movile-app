import {FlatList, SafeAreaView} from 'react-native';
import ItemSeparator from '../ItemSeparator';
import React, {useState, useEffect} from 'react';
import * as env from '../../environment/development';
import Movie from './Movie';
import HeaderMovieFilter from './HeaderMovieFilter';

const ListMovies = () => {
  const [movies, setMovies] = useState([]);
  const [moviesFilter, setMoviesFilter] = useState(env.MOVIES_PATH[0]);
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
    fetchMovies();
  }, [moviesFilter]);

  function fetchMovies() {
    setError(null);
    setLoading(true);
    setMovies([]);

    fetch(env.API_URL + moviesFilter.url + '?api_key=' + env.API_KEY)
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
    <Movie movie={movie} baseUrl={config.images.base_url} />
  );

  const renderHeaderComponent = (setFilter, actualFilter) => (
    <HeaderMovieFilter setFilter={setFilter} actualFilter={actualFilter} />
  );

  return (
    <SafeAreaView>
      <FlatList
        data={movies}
        renderItem={movie => renderItemComponent(movie.item)}
        keyExtractor={movie => movie.id}
        ItemSeparatorComponent={() => <ItemSeparator />}
        refreshing={loading}
        onRefresh={handleRefresh}
        ListHeaderComponent={() =>
          renderHeaderComponent(setMoviesFilter, moviesFilter)
        }
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}></FlatList>
    </SafeAreaView>
  );
};

export default ListMovies;
