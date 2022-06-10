import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const Movie = ({handleDetail, movie, baseUrl}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handleDetail(movie);
      }}
      style={styles.container}>
      <Image
        source={{uri: baseUrl + 'original' + movie.poster_path}}
        style={{width: 200, height: 300}}
      />
      <Text style={[styles.text, {fontWeight: 'bold'}]}>{movie.title}</Text>
      <Text style={styles.text}>{movie.release_date}</Text>
      <Text style={styles.text}>{movie.vote_average}</Text>
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
