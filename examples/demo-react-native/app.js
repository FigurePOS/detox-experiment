/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { useState } from 'react';
import { AppRegistry, Button, View } from 'react-native';
import { Page1 } from './src/page1';
import { Page5 } from './src/page5';
import { Page4 } from './src/page4';
import { Page3 } from './src/page3';
import { Page2 } from './src/page2';
import { TestIDS } from './constants/testIds';

const example = () => {
  const [page, setPage] = useState(1)
  return (
    <View style={styles.container}>
      {renderPage(page)}
      <View style={styles.pageButtons}>
        <Button title={"1"} onPress={() => setPage(1)} testID={TestIDS.PageButton}/>
        <Button title={"2"} onPress={() => setPage(2)} testID={TestIDS.PageButton}/>
        <Button title={"3"} onPress={() => setPage(3)} testID={TestIDS.PageButton}/>
        <Button title={"4"} onPress={() => setPage(4)} testID={TestIDS.PageButton}/>
        <Button title={"5"} onPress={() => setPage(5)} testID={TestIDS.PageButton}/>
      </View>
    </View>
  )
}

export const renderPage = (n) => {
    switch (n) {
      case 1:
        return <Page1 />
      case 2:
        return <Page2 />
      case 3:
        return <Page3 />
      case 4:
        return <Page4 />
      case 5:
        return <Page5 />
    }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
  },
  pageButtons: {
    flexDirection: "row",
    marginBottom: 20,
  },
}

AppRegistry.registerComponent('example', () => example);
