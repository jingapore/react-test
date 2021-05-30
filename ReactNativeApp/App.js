/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  StatusBar,
  Text
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Animated from "./Animated";

import { configureFonts, DefaultTheme, Provider as PaperProvider, Button, Card, Title, Paragraph, Surface, Paper } from 'react-native-paper';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      fontColor: "blue"
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'bold',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'bold',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'bold',
    },
  }
};

const theme = {
  ...DefaultTheme,
  roundness: 20,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
  fontFamily: {...DefaultTheme.fonts.medium.fontFamily = 'SquadaOne-Regular'} 
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
        <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <Text>Hello, world!?</Text>
          <Button mode="contained">Press Me!</Button>
          <Text>This has no style.</Text>
        </View>
        <Card>
          <Card.Content>
            <Title>title</Title>
            <Paragraph>content</Paragraph>
          </Card.Content>
        </Card>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  paper: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});

export default App;
