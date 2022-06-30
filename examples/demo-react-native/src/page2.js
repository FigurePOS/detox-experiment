import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { TestIDS } from '../constants/testIds';

export const Page2 = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text testID={TestIDS.PageHeader}>Page 2</Text>
    </SafeAreaView>
  )
}

const styles = {
  container: {
    flex: 1,
  },
}
