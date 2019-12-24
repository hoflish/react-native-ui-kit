import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Container} from '../../src';
import {Text, View} from 'react-native';
import {blueGrey200} from '../../src/styles/colors';

storiesOf('Container', module)
  .add('default', () => (
    <Container>
      <Text>Container</Text>
    </Container>
  ))
  .add('styled', () => (
    <Container
      useThemeGutterPadding
      elevation={2}
      style={{
        borderRadius: 3,
        paddingVertical: 4,
        borderColor: blueGrey200,
        borderWidth: 1,
      }}>
      <Text style={{textAlign: 'center'}}>Container with elevation</Text>
    </Container>
  ))
  .add('with image', () => (
    <Container
      elevation={3}
      backgroundColor={'white'}
      style={{
        height: 100,
        borderRadius: 10,
      }}
      backgroundImage={
        'https://cdn.pixabay.com/photo/2016/11/22/23/03/hardwood-1851071__340.jpg'
      }>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
        }}>
        <Text style={{padding: 8, color: 'black', fontWeight: 'bold'}}>
          Container with Image
        </Text>
      </View>
    </Container>
  ));
