import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Movie = ({handleDetail, movie, baseUrl}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const textStyle = {
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handleDetail(movie);
      }}
      style={[backgroundStyle, styles.container]}>
      <Image
        source={{uri: baseUrl + 'original' + movie.poster_path}}
        style={{width: 200, height: 300}}
      />
      <Text style={[textStyle, styles.text, {fontWeight: 'bold'}]}>
        {movie.title}
      </Text>
      <Text style={[textStyle, styles.text]}>{movie.release_date}</Text>
      <Text style={[textStyle, styles.text]}>{movie.vote_average}</Text>
    </TouchableOpacity>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});
