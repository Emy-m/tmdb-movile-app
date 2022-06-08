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
  Image,
  Button,
} from 'react-native';

import ItemSeparator from './ItemSeparator';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as env from '../environment/development';

const Detail = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const textStyle = {
    color: isDarkMode ? Colors.lighter : Colors.lighter,
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);
  const [config, setConfig] = useState(null);
  const [similars, setSimilars] = useState([]);

  useEffect(() => {
    loadSimilars();
    loadData();
    loadConfig();
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

  const loadSimilars = () => {
    setError(null);
    setLoading(true);

    fetch(
      env.API_URL +
        '/movie/' +
        338953 +
        '/similar?api_key=' +
        env.API_KEY +
        env.LANG,
    )
      .then(response => response.json())
      .then(json => {
        setSimilars(json.results);
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    loadData();
  };

  const renderItemComponent = similar => (
    <TouchableOpacity>
      <Image
        source={{
          uri: config.images.base_url + 'original' + similar.poster_path,
        }}
        style={{width: 200, height: 300}}
      />
      <Text style={[textStyle, styles.textRest]}>{similar.title}</Text>
    </TouchableOpacity>
  );

  //if (error) return <Error onRefresh={() => loadData()}></Error>;

  return (
    movie,
    config ? (
      <SafeAreaView style={styles.container}>
        <Image
          source={{
            uri: config.images.base_url + 'original' + movie.poster_path,
          }}
          style={{width: 200, height: 300}}
        />
        <Text style={[textStyle, styles.textTitle]}>{movie.title}</Text>
        <Text style={[textStyle, styles.textRest]}>
          {movie.runtime + 'min      ' + movie.release_date}
        </Text>
        <Text style={[textStyle, styles.textOverview]}>{movie.overview}</Text>

        <Text style={[textStyle, styles.textRest]}>{'RELACIONADOS'}</Text>

        <FlatList
          data={similars}
          renderItem={similar => renderItemComponent(similar.item)}
          keyExtractor={similar => similar.id}
          ItemSeparatorComponent={() => <ItemSeparator />}
          //refreshing={loading}
          //onRefresh={handleRefresh}
        />
      </SafeAreaView>
    ) : null
  );
};
export default Detail;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
  },

  textRest: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.5,
  },
  textOverview: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
    opacity: 0.5,
  },
  text: {
    textAlign: 'justify',
  },

  mapStyle: {
    display: 'flex',
    height: 700,
  },
});
