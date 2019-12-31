import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {
  Text,
  Title,
  Caption,
  Paragraph,
  Headline,
  Subheading,
} from '../../src/';

function Usage(params) {
  return (
    <View>
      <Title>Title </Title>
      <Headline>Headline</Headline>
      <Subheading>subheading</Subheading>
      <Text>default text </Text>
      <Paragraph>
        Reprehenderit delectus aut ipsum. Id hic porro laboriosam quia eum.
        Atque sit voluptas aut illo. Laborum vitae voluptate ducimus.
      </Paragraph>
      <Caption>Caption</Caption>
    </View>
  );
}

storiesOf('Typography', module).add('default', () => <Usage />);
