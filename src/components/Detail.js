import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as env from '../environment/development';

interface Props {
  id: number;
}

const Detail = (props: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const textStyle = {
    color: isDarkMode ? Colors.lighter : Colors.lighter,
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    loadConfig();
    loadData();
  }, []);

  const loadData = () => {
    setError(null);
    setLoading(true);

    fetch(env.API_URL + '/movie/' + 338953 + '?api_key=' + env.API_KEY)
      .then(response => response.json())
      .then(json => {
        setMovie(json);
        setLoading(false);
      });
  };

  const loadConfig = () => {
    fetch(env.CONFIGURATION_URL + env.API_KEY)
      .then(response => response.json())
      .then(json => setConfig(json));
  };

  const handleRefresh = () => {
    loadData();
  };

  const renderItemComponent = movie => (
    <TouchableOpacity>
      <Text>{movie.overview}</Text>
    </TouchableOpacity>
  );

  //if (error) return <Error onRefresh={() => loadData()}></Error>;

  return (
    <SafeAreaView>
      <FlatList
        data={movie}
        renderItem={movie => renderItemComponent(movie.item)}
        keyExtractor={movie => movie.id}
        refreshing={loading}
        onRefresh={handleRefresh}></FlatList>
    </SafeAreaView>
  );
};
export default Detail;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 8,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    textAlign: 'justify',
  },

  mapStyle: {
    display: 'flex',
    height: 700,
  },
});
