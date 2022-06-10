import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListMovies from '../Movies/ListMovies';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const navIcon = Icon.getImageSourceSync('md-arrow-back', 24, 'white');

const ListMoviesScreen = () => {
  const Tab = createBottomTabNavigator();
  const isDarkMode = useColorScheme() === 'dark';

  const tabStyle = ({route}) => ({
    tabBarStyle: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    },
    tabBarActiveTintColor: isDarkMode ? '#db711a' : '#296ee6',
    tabBarInactiveTintColor: isDarkMode ? Colors.lighter : Colors.darker,
    headerShown: false,
    showIcon: true,
    tabBarIcon: ({color, size}) => {
      let iconName;

      switch (route.name) {
        case 'Popular':
          iconName = 'star';
          break;
        case 'TopRated':
          iconName = 'flash';
          break;
        case 'Upcoming':
          iconName = 'calendar';
          break;
        case 'NowPlaying':
          iconName = 'film';
          break;
      }

      return <Icon name={iconName} size={size} color={color} />;
    },
  });

  return (
    <Tab.Navigator screenOptions={tabStyle}>
      <Tab.Screen
        name="Popular"
        component={ListMovies}
        initialParams={{sortBy: 'Popular'}}
        tabBarIcon={({focused, color, size}) => {
          let iconName;
          iconName = focused ? 'star' : 'star-outline';
          return <Icon name={'rocket'} size={size} color={color} />;
        }}
      />
      <Tab.Screen
        name="TopRated"
        component={ListMovies}
        initialParams={{sortBy: 'Top Rated'}}
      />
      <Tab.Screen
        name="Upcoming"
        component={ListMovies}
        initialParams={{sortBy: 'Upcoming'}}
      />
      <Tab.Screen
        name="NowPlaying"
        component={ListMovies}
        initialParams={{sortBy: 'Now Playing'}}
      />
    </Tab.Navigator>
  );
};

export default ListMoviesScreen;
