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

    fetch(
      'https://api.themoviedb.org/3/movie/338953?api_key=dfdf0b6612d100978455295b22cc7edc',
    )
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
  //if (error) return <Error onRefresh={() => loadData()}></Error>;

  return movie ? (
    <SafeAreaView>
      <Text>{movie.overview}</Text>
    </SafeAreaView>
  ) : null;
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
