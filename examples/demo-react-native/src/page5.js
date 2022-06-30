import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { TestIDS } from '../constants/testIds';

export const Page5 = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text testID={TestIDS.PageHeader}>Page 5</Text>
    </SafeAreaView>
  )
}

const styles = {
  container: {
    flex: 1,
  },
}
