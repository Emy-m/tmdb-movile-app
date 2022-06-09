import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListMovies from '../Movies/ListMovies';

const ListMoviesScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Popular"
        component={ListMovies}
        initialParams={{sortBy: 'Popular'}}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="TopRated"
        component={ListMovies}
        initialParams={{sortBy: 'Top Rated'}}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Upcoming"
        component={ListMovies}
        initialParams={{sortBy: 'Upcoming'}}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="NowPlaying"
        component={ListMovies}
        initialParams={{sortBy: 'Now Playing'}}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default ListMoviesScreen;
