import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  Image,
} from 'react-native';

import ItemSeparator from './ItemSeparator';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as env from '../environment/development';

interface Props {
  id: number;
}

const Detail = (props: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const textStyle = {
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);
  const [similars, setSimilars] = useState([]);

  useEffect(() => {
    loadData().then(() => loadSimilars());
  }, []);

  const loadData = () => {
    setError(null);
    setLoading(true);

    return fetch(env.API_URL + '/movie/' + props.id + '?api_key=' + env.API_KEY)
      .then(response => response.json())
      .then(json => {
        setMovie(json);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const loadSimilars = () => {
    fetch(
      env.API_URL + '/movie/' + props.id + '/similar?api_key=' + env.API_KEY,
    )
      .then(response => response.json())
      .then(json => {
        setSimilars(json.results);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    loadData();
  };

  const renderItemComponent = similar => (
    <TouchableOpacity style={[backgroundStyle, styles.container]}>
      <Image
        source={{
          uri: env.IMAGES_PATH + 'original' + similar.poster_path,
        }}
        style={{width: 200, height: 300}}
      />
      <Text style={[textStyle, styles.textRest]}>{similar.title}</Text>
    </TouchableOpacity>
  );

  return movie ? (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <Image
        source={{
          uri: env.IMAGES_PATH + 'original' + movie.poster_path,
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
  ) : null;
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
